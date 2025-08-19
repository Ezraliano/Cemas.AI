from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from app.core.db import Base


class IkigaiDomain(enum.Enum):
    PASSION = "passion"
    MISSION = "mission"
    PROFESSION = "profession"
    VOCATION = "vocation"


class IkigaiQuestion(Base):
    __tablename__ = "ikigai_questions"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    domain = Column(String, nullable=False)  # Using String instead of Enum for flexibility
    text = Column(Text, nullable=False)
    active = Column(Boolean, default=True)


class IkigaiResponse(Base):
    __tablename__ = "ikigai_responses"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    answers = Column(JSONB, nullable=False)
    scores = Column(JSONB, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", backref="ikigai_responses")