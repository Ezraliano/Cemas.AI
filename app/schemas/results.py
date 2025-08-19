from pydantic import BaseModel
from typing import List, Dict
from .ikigai import IkigaiScoreResponse
from .mbti import MBTIScoreResponse


class ActionPlanItem(BaseModel):
    horizon: str
    steps: List[str]


class CombinedResultResponse(BaseModel):
    ikigai: IkigaiScoreResponse
    mbti: MBTIScoreResponse
    careers: List[str]
    optimal_work: List[str]
    blindspots: List[str]
    action_plan: List[ActionPlanItem]