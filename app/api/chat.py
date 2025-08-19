from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.services.chat_service import ChatService
from app.schemas.chat import ChatMessageRequest, ChatMessageResponse

router = APIRouter()
chat_service = ChatService()


@router.post("/message", response_model=ChatMessageResponse)
def send_chat_message(
    request: ChatMessageRequest,
    db: Session = Depends(get_db)
):
    """Send a message to the AI coach"""
    try:
        response = chat_service.send_message(db, request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))