from sqlalchemy.orm import Session
from typing import List, Dict
from app.models.mbti import MBTIQuestion, MBTIResponse
from app.schemas.mbti import MBTIScoreRequest, MBTIScoreResponse


class MBTIService:
    @staticmethod
    def get_questions(db: Session) -> List[MBTIQuestion]:
        return db.query(MBTIQuestion).filter(MBTIQuestion.active == True).all()
    
    @staticmethod
    def calculate_mbti_result(
        db: Session, 
        request: MBTIScoreRequest
    ) -> MBTIScoreResponse:
        # Fetch questions to map answers to dimensions
        questions = db.query(MBTIQuestion).all()
        question_map = {q.id: q.dimension for q in questions}
        
        # Group answers by dimension
        dimension_answers = {
            "EI": [],
            "SN": [],
            "TF": [],
            "JP": []
        }
        
        for answer in request.answers:
            dimension = question_map.get(answer.question_id)
            if dimension:
                dimension_answers[dimension].append(answer.value)
        
        # Calculate dimension scores (percentage towards second letter)
        dimensions = {}
        for dim, values in dimension_answers.items():
            if values:
                avg_score = sum(values) / len(values)
                dimensions[dim] = (avg_score / 5) * 100
            else:
                dimensions[dim] = 50  # neutral
        
        # Determine MBTI type
        mbti_type = ""
        mbti_type += "E" if dimensions["EI"] > 50 else "I"
        mbti_type += "N" if dimensions["SN"] > 50 else "S"
        mbti_type += "F" if dimensions["TF"] > 50 else "T"
        mbti_type += "P" if dimensions["JP"] > 50 else "J"
        
        # Get type characteristics (simplified)
        type_data = MBTIService._get_type_characteristics(mbti_type)
        
        # Save to database
        mbti_response = MBTIResponse(
            user_id=request.user_id,
            answers={str(a.question_id): a.value for a in request.answers},
            result_type=mbti_type,
            meta={
                "dimensions": dimensions,
                "strengths": type_data["strengths"],
                "weaknesses": type_data["weaknesses"],
                "work_style": type_data["work_style"],
                "description": type_data["description"]
            }
        )
        db.add(mbti_response)
        db.commit()
        
        return MBTIScoreResponse(
            type=mbti_type,
            dimensions=dimensions,
            strengths=type_data["strengths"],
            weaknesses=type_data["weaknesses"],
            work_style=type_data["work_style"],
            description=type_data["description"]
        )
    
    @staticmethod
    def _get_type_characteristics(mbti_type: str) -> Dict:
        # Simplified type characteristics - in production, this would be more comprehensive
        type_map = {
            "INTJ": {
                "strengths": ["Strategic thinking", "Independent", "Determined", "Innovative"],
                "weaknesses": ["Can be overly critical", "Impatient with inefficiency", "May ignore emotions"],
                "work_style": ["Prefers autonomy", "Long-term planning", "Complex problem solving"],
                "description": "The Architect - Imaginative and strategic thinkers, with a plan for everything."
            },
            "ENFP": {
                "strengths": ["Enthusiastic", "Creative", "Flexible", "Good with people"],
                "weaknesses": ["Can be unfocused", "Dislikes routine", "Overthinks criticism"],
                "work_style": ["Collaborative", "Variety in tasks", "People-focused projects"],
                "description": "The Campaigner - Enthusiastic, creative and sociable free spirits."
            }
        }
        
        return type_map.get(mbti_type, {
            "strengths": ["Analytical", "Reliable", "Creative", "Empathetic"],
            "weaknesses": ["Can be perfectionist", "May avoid conflict", "Sensitive to stress"],
            "work_style": ["Balanced approach", "Team collaboration", "Quality focused"],
            "description": f"The {mbti_type} type - A unique combination of traits and preferences."
        })