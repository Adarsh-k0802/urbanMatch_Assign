from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import models
import schemas
from database import engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Marriage Matchmaking API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Helper function to get or create interests
def get_or_create_interests(db: Session, interest_names: List[str]):
    interests = []
    for name in interest_names:
        interest = db.query(models.Interest).filter(models.Interest.name == name.lower()).first()
        if not interest:
            interest = models.Interest(name=name.lower())
            db.add(interest)
            db.commit()
            db.refresh(interest)
        interests.append(interest)
    return interests

# Create user endpoint
@app.post("/users/", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user with email already exists
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    db_user = models.User(
        name=user.name,
        age=user.age,
        gender=user.gender,
        email=user.email,
        city=user.city
    )
    
    # Add interests
    interests = get_or_create_interests(db, user.interests)
    db_user.interests = interests
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Read users endpoint
@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(models.User).offset(skip).limit(limit).all()
    return users

# Read user by ID endpoint
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Update user endpoint
@app.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
 
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.email is not None and user.email != db_user.email:
        email_exists = db.query(models.User).filter(models.User.email == user.email).first()
        if email_exists:
            raise HTTPException(status_code=400, detail="Email already registered")
    
    user_data = user.dict(exclude_unset=True)
    
    interests = user_data.pop("interests", None)
    
    for key, value in user_data.items():
        if value is not None:
            setattr(db_user, key, value)
    

    if interests is not None:
        db_user.interests = get_or_create_interests(db, interests)
    
    db.commit()
    db.refresh(db_user)
    return db_user

# Delete user endpoint
@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
 
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(db_user)
    db.commit()
    return None

# Find matches endpoint
@app.get("/users/{user_id}/matches", response_model=schemas.MatchResponse)
def find_matches(
    user_id: int, 
    min_age: Optional[int] = None, 
    max_age: Optional[int] = None,
    city: Optional[str] = None,
    interest_match: Optional[bool] = True,
    db: Session = Depends(get_db)
):

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    query = db.query(models.User).filter(models.User.id != user_id)
    
    # Filter by opposite gender (assuming binary matching for simplicity)
    if user.gender.lower() == "male":
        query = query.filter(models.User.gender == "female")
    elif user.gender.lower() == "female":
        query = query.filter(models.User.gender == "male")
    
    # Apply age filter if provided
    if min_age is not None:
        query = query.filter(models.User.age >= min_age)
    if max_age is not None:
        query = query.filter(models.User.age <= max_age)
    
    # Apply city filter if provided
    if city is not None:
        query = query.filter(models.User.city == city)
    
    # Get all potential matches
    potential_matches = query.all()
    
    # If interest matching is enabled, sort by number of matching interests
    if interest_match and user.interests:
        user_interest_ids = {interest.id for interest in user.interests}
        
        # Calculate match scores based on common interests
        matches_with_scores = []
        for match in potential_matches:
            match_interest_ids = {interest.id for interest in match.interests}
            common_interests = user_interest_ids.intersection(match_interest_ids)
            matches_with_scores.append((match, len(common_interests)))
        
        # Sort by number of matching interests (descending)
        matches_with_scores.sort(key=lambda x: x[1], reverse=True)
        matches = [match for match, _ in matches_with_scores]
    else:
        matches = potential_matches
    
    return {"matches": matches, "match_count": len(matches)}

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Marriage Matchmaking API"} 
