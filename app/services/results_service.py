from sqlalchemy.orm import Session
from typing import List
from uuid import UUID
from app.models.results import CombinedResult
from app.models.ikigai import IkigaiResponse
from app.models.mbti import MBTIResponse
from app.schemas.results import CombinedResultResponse, ActionPlanItem
from app.schemas.ikigai import IkigaiScoreResponse
from app.schemas.mbti import MBTIScoreResponse


class ResultsService:
    @staticmethod
    def get_combined_results(db: Session, user_id: UUID) -> CombinedResultResponse:
        # Get latest ikigai and mbti responses
        ikigai_response = db.query(IkigaiResponse).filter(
            IkigaiResponse.user_id == user_id
        ).order_by(IkigaiResponse.created_at.desc()).first()
        
        mbti_response = db.query(MBTIResponse).filter(
            MBTIResponse.user_id == user_id
        ).order_by(MBTIResponse.created_at.desc()).first()
        
        if not ikigai_response or not mbti_response:
            raise ValueError("Missing assessment results")
        
        # Generate combined insights
        careers = ResultsService._generate_career_suggestions(
            ikigai_response.scores, 
            mbti_response.result_type
        )
        
        optimal_work = ResultsService._generate_work_preferences(
            ikigai_response.scores,
            mbti_response.meta
        )
        
        blindspots = ResultsService._generate_blindspots(
            ikigai_response.scores,
            mbti_response.meta
        )
        
        action_plan = ResultsService._generate_action_plan(
            ikigai_response.scores,
            mbti_response.result_type
        )
        
        # Save combined result
        combined_result = CombinedResult(
            user_id=user_id,
            ikigai_ref=ikigai_response.id,
            mbti_ref=mbti_response.id,
            careers=careers,
            blindspots=blindspots,
            action_plan=[{"horizon": ap.horizon, "steps": ap.steps} for ap in action_plan]
        )
        db.add(combined_result)
        db.commit()
        
        # Build response
        ikigai_insights = [
            f"Your {domain} score is {score:.0f}" 
            for domain, score in ikigai_response.scores.items()
        ]
        
        return CombinedResultResponse(
            ikigai=IkigaiScoreResponse(
                scores=ikigai_response.scores,
                insights=ikigai_insights
            ),
            mbti=MBTIScoreResponse(
                type=mbti_response.result_type,
                dimensions=mbti_response.meta.get("dimensions", {}),
                strengths=mbti_response.meta.get("strengths", []),
                weaknesses=mbti_response.meta.get("weaknesses", []),
                work_style=mbti_response.meta.get("work_style", []),
                description=mbti_response.meta.get("description", "")
            ),
            careers=careers,
            optimal_work=optimal_work,
            blindspots=blindspots,
            action_plan=action_plan
        )
    
    @staticmethod
    def _generate_career_suggestions(ikigai_scores: dict, mbti_type: str) -> List[str]:
        # Simplified career matching logic
        careers = []
        
        if ikigai_scores.get("passion", 0) > 70:
            careers.extend(["Creative Director", "Artist", "Designer"])
        
        if ikigai_scores.get("mission", 0) > 70:
            careers.extend(["Social Worker", "Teacher", "Non-profit Manager"])
        
        if ikigai_scores.get("profession", 0) > 70:
            careers.extend(["Consultant", "Specialist", "Expert"])
        
        if ikigai_scores.get("vocation", 0) > 70:
            careers.extend(["Entrepreneur", "Business Analyst", "Sales Manager"])
        
        # MBTI-based additions
        if "N" in mbti_type:
            careers.extend(["Innovation Manager", "Strategy Consultant"])
        
        return list(set(careers))[:6]  # Return unique careers, max 6
    
    @staticmethod
    def _generate_work_preferences(ikigai_scores: dict, mbti_meta: dict) -> List[str]:
        preferences = []
        
        if ikigai_scores.get("passion", 0) > 60:
            preferences.append("Work on projects you're passionate about")
        
        if ikigai_scores.get("mission", 0) > 60:
            preferences.append("Focus on meaningful, impactful work")
        
        preferences.extend(mbti_meta.get("work_style", []))
        
        return preferences[:5]
    
    @staticmethod
    def _generate_blindspots(ikigai_scores: dict, mbti_meta: dict) -> List[str]:
        blindspots = []
        
        # Low scoring areas become blindspots
        for domain, score in ikigai_scores.items():
            if score < 40:
                blindspots.append(f"Develop your {domain} dimension")
        
        blindspots.extend(mbti_meta.get("weaknesses", []))
        
        return blindspots[:4]
    
    @staticmethod
    def _generate_action_plan(ikigai_scores: dict, mbti_type: str) -> List[ActionPlanItem]:
        return [
            ActionPlanItem(
                horizon="1w",
                steps=[
                    "Complete a self-reflection exercise",
                    "Identify your top 3 strengths",
                    "Set one small goal aligned with your passion"
                ]
            ),
            ActionPlanItem(
                horizon="1m", 
                steps=[
                    "Explore career opportunities in your field",
                    "Network with professionals in areas of interest",
                    "Develop a skill that enhances your profession score"
                ]
            ),
            ActionPlanItem(
                horizon="3m",
                steps=[
                    "Launch a project that combines your strengths",
                    "Seek mentorship in your chosen direction",
                    "Create a long-term development plan"
                ]
            )
        ]