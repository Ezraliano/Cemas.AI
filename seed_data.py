"""
Script to seed the database with initial Ikigai and MBTI questions
"""
from sqlalchemy.orm import Session
from app.core.db import SessionLocal, engine
from app.models.ikigai import IkigaiQuestion
from app.models.mbti import MBTIQuestion
from app.core.db import Base

# Create tables
Base.metadata.create_all(bind=engine)

# Ikigai questions data
ikigai_questions = [
    # Passion questions
    {"domain": "passion", "text": "I feel energized when working on activities I love"},
    {"domain": "passion", "text": "I often lose track of time doing things I enjoy"},
    {"domain": "passion", "text": "I would do certain activities even without payment"},
    {"domain": "passion", "text": "I feel excited talking about my hobbies and interests"},
    {"domain": "passion", "text": "I actively seek opportunities to engage in my interests"},
    
    # Mission questions
    {"domain": "mission", "text": "I feel fulfilled when helping others or making a difference"},
    {"domain": "mission", "text": "I have a strong sense of what the world needs"},
    {"domain": "mission", "text": "I am motivated by causes greater than myself"},
    {"domain": "mission", "text": "I want my work to have a positive impact on society"},
    {"domain": "mission", "text": "I feel responsible for contributing to positive change"},
    
    # Profession questions
    {"domain": "profession", "text": "I am skilled at activities that come naturally to me"},
    {"domain": "profession", "text": "Others often compliment me on my abilities"},
    {"domain": "profession", "text": "I can perform certain tasks better than most people"},
    {"domain": "profession", "text": "I have developed expertise in specific areas"},
    {"domain": "profession", "text": "I feel confident in my core competencies"},
    
    # Vocation questions
    {"domain": "vocation", "text": "I can earn money from my skills and knowledge"},
    {"domain": "vocation", "text": "There is market demand for what I can offer"},
    {"domain": "vocation", "text": "I can create sustainable income from my abilities"},
    {"domain": "vocation", "text": "People are willing to pay for my expertise"},
    {"domain": "vocation", "text": "I see clear career paths using my strengths"},
]

# MBTI questions data
mbti_questions = [
    # Extraversion vs Introversion
    {"dimension": "EI", "text": "I enjoy being the center of attention at parties"},
    {"dimension": "EI", "text": "I feel energized after social gatherings"},
    {"dimension": "EI", "text": "I easily start conversations with strangers"},
    {"dimension": "EI", "text": "I prefer working in groups rather than alone"},
    {"dimension": "EI", "text": "I think out loud and process ideas by talking"},
    
    # Sensing vs Intuition
    {"dimension": "SN", "text": "I enjoy exploring new ideas and concepts"},
    {"dimension": "SN", "text": "I like to think about future possibilities"},
    {"dimension": "SN", "text": "I trust my instincts more than detailed analysis"},
    {"dimension": "SN", "text": "I prefer theoretical discussions over practical ones"},
    {"dimension": "SN", "text": "I focus on the big picture rather than details"},
    
    # Thinking vs Feeling
    {"dimension": "TF", "text": "I consider how decisions affect people's feelings"},
    {"dimension": "TF", "text": "I value harmony in relationships over being right"},
    {"dimension": "TF", "text": "I am sensitive to others' emotional needs"},
    {"dimension": "TF", "text": "I make decisions based on personal values"},
    {"dimension": "TF", "text": "I prefer cooperation over competition"},
    
    # Judging vs Perceiving
    {"dimension": "JP", "text": "I enjoy keeping my options open"},
    {"dimension": "JP", "text": "I adapt easily to unexpected changes"},
    {"dimension": "JP", "text": "I prefer flexibility over rigid schedules"},
    {"dimension": "JP", "text": "I work well under pressure and tight deadlines"},
    {"dimension": "JP", "text": "I like to explore multiple approaches before deciding"},
]


def seed_database():
    db = SessionLocal()
    
    try:
        # Check if data already exists
        existing_ikigai = db.query(IkigaiQuestion).first()
        existing_mbti = db.query(MBTIQuestion).first()
        
        if existing_ikigai and existing_mbti:
            print("Database already seeded!")
            return
        
        # Seed Ikigai questions
        if not existing_ikigai:
            for question_data in ikigai_questions:
                question = IkigaiQuestion(**question_data)
                db.add(question)
            print(f"Added {len(ikigai_questions)} Ikigai questions")
        
        # Seed MBTI questions
        if not existing_mbti:
            for question_data in mbti_questions:
                question = MBTIQuestion(**question_data)
                db.add(question)
            print(f"Added {len(mbti_questions)} MBTI questions")
        
        db.commit()
        print("Database seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()