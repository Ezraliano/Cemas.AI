from sqlalchemy.orm import Session
from typing import List, Dict
from app.models.ikigai import IkigaiQuestion, IkigaiResponse
from app.schemas.ikigai import IkigaiScoreRequest, IkigaiScoreResponse


class IkigaiService:
    @staticmethod
    def get_questions(db: Session) -> List[IkigaiQuestion]:
        return db.query(IkigaiQuestion).filter(IkigaiQuestion.active == True).all()
    
    @staticmethod
    def calculate_scores_and_insights(
        db: Session, 
        request: IkigaiScoreRequest
    ) -> IkigaiScoreResponse:
        # Fetch questions to map answers to domains
        questions = db.query(IkigaiQuestion).all()
        question_map = {q.id: q.domain for q in questions}
        
        # Group answers by domain
        domain_answers = {
            "passion": [],
            "mission": [],
            "profession": [],
            "vocation": []
        }
        
        for answer in request.answers:
            domain = question_map.get(answer.question_id)
            if domain:
                domain_answers[domain].append(answer.value)
        
        # Calculate scores (average * 20 to scale to 0-100)
        scores = {}
        for domain, values in domain_answers.items():
            if values:
                scores[domain] = (sum(values) / len(values)) * 20
            else:
                scores[domain] = 0
        
        # Generate insights
        insights = []
        for domain, score in scores.items():
            if score > 70:
                insights.append(f"Your {domain} is strong - keep nurturing what drives you in this area.")
            elif score < 40:
                insights.append(f"Your {domain} needs attention - explore ways to strengthen this dimension.")
            else:
                insights.append(f"Your {domain} shows moderate alignment - there's room for growth.")
        
        # Save to database
        ikigai_response = IkigaiResponse(
            user_id=request.user_id,
            answers={str(a.question_id): a.value for a in request.answers},
            scores=scores
        )
        db.add(ikigai_response)
        db.commit()
        
        return IkigaiScoreResponse(scores=scores, insights=insights)