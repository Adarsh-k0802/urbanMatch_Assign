from sqlalchemy import Column, Integer, String, Enum, Table, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# many-to-many relationship between users and interests
user_interests = Table(
    "user_interests",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("interest_id", Integer, ForeignKey("interests.id"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    gender = Column(String)
    email = Column(String, unique=True, index=True)
    city = Column(String)
    
    # Relationship with interests
    interests = relationship("Interest", secondary=user_interests, back_populates="users")

class Interest(Base):
    __tablename__ = "interests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    
    # Relationship with users
    users = relationship("User", secondary=user_interests, back_populates="interests") 