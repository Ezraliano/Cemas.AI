from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID
from datetime import datetime


class UserCreate(BaseModel):
    email: Optional[EmailStr] = None
    age: int
    goal: str


class UserResponse(BaseModel):
    id: UUID
    email: Optional[str]
    age: int
    goal: str
    created_at: datetime
    
    class Config:
        from_attributes = True