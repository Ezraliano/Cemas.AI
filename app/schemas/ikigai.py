from pydantic import BaseModel
from typing import List, Dict
from uuid import UUID


class IkigaiQuestionResponse(BaseModel):
    id: int
    domain: str
    text: str
    
    class Config:
        from_attributes = True


class IkigaiAnswerItem(BaseModel):
    question_id: int
    value: int


class IkigaiScoreRequest(BaseModel):
    user_id: UUID
    answers: List[IkigaiAnswerItem]


class IkigaiScoreResponse(BaseModel):
    scores: Dict[str, float]
    insights: List[str]