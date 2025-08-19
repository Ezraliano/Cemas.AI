from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.db import get_db
from app.services.results_service import ResultsService
from app.schemas.results import CombinedResultResponse

router = APIRouter()


@router.get("/combined/{user_id}", response_model=CombinedResultResponse)
def get_combined_results(
    user_id: UUID,
    db: Session = Depends(get_db)
):
    """Get combined Ikigai and MBTI results with career suggestions"""
    try:
        result = ResultsService.get_combined_results(db, user_id)
        return result
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))