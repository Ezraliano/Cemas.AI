from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.db import Base


class CombinedResult(Base):
    __tablename__ = "combined_results"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    ikigai_ref = Column(Integer, ForeignKey("ikigai_responses.id"), nullable=False)
    mbti_ref = Column(Integer, ForeignKey("mbti_responses.id"), nullable=False)
    careers = Column(JSONB, nullable=False)
    blindspots = Column(JSONB, nullable=False)
    action_plan = Column(JSONB, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", backref="combined_results")
    ikigai_response = relationship("IkigaiResponse")
    mbti_response = relationship("MBTIResponse")