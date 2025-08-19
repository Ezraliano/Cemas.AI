from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    database_url: str
    jwt_secret: str
    groq_api_key: str
    jwt_algorithm: str
    jwt_expiration_minutes: int
    app_name: str
    app_env: str
    debug: bool
    cors_origins: str = "http://localhost:3000"
    
    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",")]
    
    class Config:
        env_file = ".env"


settings = Settings()