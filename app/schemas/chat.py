from pydantic import BaseModel
from typing import List, Dict
from uuid import UUID
from datetime import datetime


class ChatMessageRequest(BaseModel):
    user_id: UUID
    message: str
    history: List[Dict] = []


class ChatMessageResponse(BaseModel):
    id: int
    role: str
    content: str
    created_at: datetime
    
    class Config:
        from_attributes = True