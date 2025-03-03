from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field, validator

class InterestBase(BaseModel):
    name: str

class InterestCreate(InterestBase):
    pass

class Interest(InterestBase):
    id: int

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    name: str
    age: int = Field(..., gt=17, lt=100)  
    gender: str
    email: EmailStr  # Using EmailStr for email validation
    city: str
    
    @validator('gender')
    def validate_gender(cls, v):
        if v.lower() not in ['male', 'female', 'other']:
            raise ValueError('Gender must be male, female, or other')
        return v.lower()

class UserCreate(UserBase):
    interests: List[str]

class UserUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = Field(None, gt=17, lt=100)
    gender: Optional[str] = None
    email: Optional[EmailStr] = None
    city: Optional[str] = None
    interests: Optional[List[str]] = None
    
    @validator('gender')
    def validate_gender(cls, v):
        if v is not None and v.lower() not in ['male', 'female', 'other']:
            raise ValueError('Gender must be male, female, or other')
        return v.lower() if v is not None else v

class User(UserBase):
    id: int
    interests: List[Interest]

    class Config:
        from_attributes = True

class MatchResponse(BaseModel):
    matches: List[User]
    match_count: int 