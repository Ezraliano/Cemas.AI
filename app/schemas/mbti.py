from pydantic import BaseModel
from typing import List, Dict
from uuid import UUID


class MBTIQuestionResponse(BaseModel):
    id: int
    dimension: str
    text: str
    
    class Config:
        from_attributes = True


class MBTIAnswerItem(BaseModel):
    question_id: int
    value: int


class MBTIScoreRequest(BaseModel):
    user_id: UUID
    answers: List[MBTIAnswerItem]


class MBTIScoreResponse(BaseModel):
    type: str
    dimensions: Dict[str, float]
    strengths: List[str]
    weaknesses: List[str]
    work_style: List[str]
    description: str