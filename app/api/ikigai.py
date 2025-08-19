from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.db import get_db
from app.services.ikigai_service import IkigaiService
from app.schemas.ikigai import IkigaiQuestionResponse, IkigaiScoreRequest, IkigaiScoreResponse

router = APIRouter()


@router.get("/questions", response_model=List[IkigaiQuestionResponse])
def get_ikigai_questions(db: Session = Depends(get_db)):
    """Get all active Ikigai questions"""
    questions = IkigaiService.get_questions(db)
    return questions


@router.post("/score", response_model=IkigaiScoreResponse)
def calculate_ikigai_score(
    request: IkigaiScoreRequest,
    db: Session = Depends(get_db)
):
    """Calculate Ikigai scores and generate insights"""
    try:
        result = IkigaiService.calculate_scores_and_insights(db, request)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))