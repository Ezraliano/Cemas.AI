from sqlalchemy.orm import Session
from typing import List, Dict
from uuid import UUID
import json
from groq import Groq
from app.core.config import settings
from app.models.chat import ChatSession, ChatMessage
from app.models.ikigai import IkigaiResponse
from app.models.mbti import MBTIResponse
from app.schemas.chat import ChatMessageRequest, ChatMessageResponse


class ChatService:
    def __init__(self):
        self.groq_client = Groq(api_key=settings.groq_api_key)
    
    def send_message(
        self, 
        db: Session, 
        request: ChatMessageRequest
    ) -> ChatMessageResponse:
        # Get or create chat session
        session = db.query(ChatSession).filter(
            ChatSession.user_id == request.user_id
        ).first()
        
        if not session:
            session = ChatSession(user_id=request.user_id)
            db.add(session)
            db.commit()
            db.refresh(session)
        
        # Save user message
        user_message = ChatMessage(
            session_id=session.id,
            role="user",
            content=request.message
        )
        db.add(user_message)
        
        # Get user's assessment context
        context = self._get_user_context(db, request.user_id)
        
        # Generate AI response
        ai_response_content = self._generate_ai_response(
            request.message, 
            request.history,
            context
        )
        
        # Save AI response
        ai_message = ChatMessage(
            session_id=session.id,
            role="assistant", 
            content=ai_response_content
        )
        db.add(ai_message)
        db.commit()
        db.refresh(ai_message)
        
        return ChatMessageResponse(
            id=ai_message.id,
            role=ai_message.role,
            content=ai_message.content,
            created_at=ai_message.created_at
        )
    
    def _get_user_context(self, db: Session, user_id: UUID) -> str:
        # Get latest assessment results for context
        ikigai = db.query(IkigaiResponse).filter(
            IkigaiResponse.user_id == user_id
        ).order_by(IkigaiResponse.created_at.desc()).first()
        
        mbti = db.query(MBTIResponse).filter(
            MBTIResponse.user_id == user_id
        ).order_by(MBTIResponse.created_at.desc()).first()
        
        context = "User Assessment Context:\n"
        
        if ikigai:
            context += f"Ikigai Scores: {json.dumps(ikigai.scores, indent=2)}\n"
        
        if mbti:
            context += f"MBTI Type: {mbti.result_type}\n"
            context += f"MBTI Details: {json.dumps(mbti.meta, indent=2)}\n"
        
        return context
    
    def _generate_ai_response(
        self, 
        message: str, 
        history: List[Dict],
        context: str
    ) -> str:
        # Build conversation history
        messages = [
            {
                "role": "system",
                "content": f"""You are Cemas.AI, a helpful life coach assistant specializing in Ikigai and personality development. 
                
                {context}
                
                Provide personalized, actionable advice based on the user's assessment results. Be encouraging, specific, and practical. 
                Keep responses concise but meaningful."""
            }
        ]
        
        # Add conversation history
        for msg in history[-5:]:  # Last 5 messages for context
            messages.append({
                "role": msg.get("role", "user"),
                "content": msg.get("content", "")
            })
        
        # Add current message
        messages.append({
            "role": "user",
            "content": message
        })
        
        try:
            # Call Groq API
            response = self.groq_client.chat.completions.create(
                model="mixtral-8x7b-32768",
                messages=messages,
                max_tokens=500,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            # Fallback response
            return "I'm having trouble processing your request right now. Please try again in a moment."