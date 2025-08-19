# Cemas.AI Backend

AI-powered Ikigai and personality assessment platform backend built with FastAPI and PostgreSQL.

## Features

- **Ikigai Assessment**: Discover life purpose across 4 key dimensions
- **MBTI Personality Test**: 16 personalities assessment
- **Combined Results**: Career suggestions and action plans
- **AI Chat Coach**: Personalized guidance using Groq API
- **Clean Architecture**: Modular, scalable, and maintainable code

## Tech Stack

- **FastAPI**: Modern, fast web framework for building APIs
- **PostgreSQL**: Robust relational database (via Supabase)
- **SQLAlchemy**: Python SQL toolkit and ORM
- **Pydantic**: Data validation using Python type annotations
- **Alembic**: Database migration tool
- **Groq**: AI chat completions

## Project Structure

```
app/
├── api/           # API route handlers
├── core/          # Core configuration and database
├── models/        # SQLAlchemy ORM models
├── schemas/       # Pydantic request/response models
└── services/      # Business logic layer
```

## Setup

1. **Install dependencies**:
```bash
pip install -r requirements.txt
```

2. **Environment variables**:
Create a `.env` file with:
```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-jwt-secret
GROQ_API_KEY=your-groq-api-key
CORS_ORIGINS=http://localhost:3000
```

3. **Initialize database**:
```bash
# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migration
alembic upgrade head

# Seed with questions
python seed_data.py
```

4. **Run the server**:
```bash
uvicorn main:app --reload
```

## API Endpoints

### Health Check
- `GET /health` - Health check endpoint

### Ikigai Assessment
- `GET /api/ikigai/questions` - Get all Ikigai questions
- `POST /api/ikigai/score` - Submit answers and get scores

### MBTI Assessment  
- `GET /api/mbti/questions` - Get all MBTI questions
- `POST /api/mbti/score` - Submit answers and get personality type

### Results
- `GET /api/results/combined/{user_id}` - Get combined assessment results

### Chat
- `POST /api/chat/message` - Send message to AI coach

## Database Schema

### Core Tables
- `users` - User profiles
- `ikigai_questions` - Ikigai assessment questions
- `ikigai_responses` - User Ikigai responses and scores
- `mbti_questions` - MBTI assessment questions  
- `mbti_responses` - User MBTI responses and results
- `combined_results` - Integrated assessment results
- `chat_sessions` & `chat_messages` - Chat history

## Development

### Adding New Features
1. Create models in `app/models/`
2. Define schemas in `app/schemas/`
3. Implement business logic in `app/services/`
4. Add API routes in `app/api/`
5. Update main.py to include new routers

### Database Migrations
```bash
# Create new migration
alembic revision --autogenerate -m "Description"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1
```

## Production Deployment

1. Set production environment variables
2. Use a production WSGI server like Gunicorn
3. Configure proper CORS origins
4. Set up database connection pooling
5. Implement proper logging and monitoring

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`