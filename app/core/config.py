from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    database_url: str
    jwt_secret: str
    groq_api_key: str
    cors_origins: str = "http://localhost:3000"
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]
    
    class Config:
        env_file = ".env"


settings = Settings()