from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.db import Base


class MBTIQuestion(Base):
    __tablename__ = "mbti_questions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    dimension = Column(String(2), nullable=False)  # EI, SN, TF, JP
    text = Column(Text, nullable=False)
    active = Column(Boolean, default=True)


class MBTIResponse(Base):
    __tablename__ = "mbti_responses"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    answers = Column(JSONB, nullable=False)
    result_type = Column(String(4), nullable=False)  # e.g., "ENFP"
    meta = Column(JSONB, nullable=False)  # dimensions, strengths, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", backref="mbti_responses")