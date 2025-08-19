from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.db import get_db
from app.services.mbti_service import MBTIService
from app.schemas.mbti import MBTIQuestionResponse, MBTIScoreRequest, MBTIScoreResponse

router = APIRouter()


@router.get("/questions", response_model=List[MBTIQuestionResponse])
def get_mbti_questions(db: Session = Depends(get_db)):
    """Get all active MBTI questions"""
    questions = MBTIService.get_questions(db)
    return questions


@router.post("/score", response_model=MBTIScoreResponse)
def calculate_mbti_result(
    request: MBTIScoreRequest,
    db: Session = Depends(get_db)
):
    """Calculate MBTI type and characteristics"""
    try:
        result = MBTIService.calculate_mbti_result(db, request)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))