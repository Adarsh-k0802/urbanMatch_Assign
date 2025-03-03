# Matchmaking App

A full-stack application designed to help users find potential matches based on their profile information, interests, and preferences.

## Project Overview

The Marriage Matchmaking App consists of:

1. **Backend**: A FastAPI-based RESTful API with SQLite database
2. **Frontend**: A React-based single-page application

## Features

- **User Management**: Create, read, update, and delete user profiles
- **Profile Information**: Store user details such as name, age, gender, email, city, and interests
- **Matchmaking Algorithm**: Find potential matches based on gender, age, location, and common interests
- **Responsive Design**: Beautiful UI that works on all devices

## Tech Stack

### Backend
- Python 3.7+
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### Frontend
- React with TypeScript
- Material-UI
- React Router
- Formik & Yup
- Axios



### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/marriage-matchmaking-app.git
cd marriage-matchmaking-app
```

2. Set up the backend:
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On Unix or MacOS
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend:
```bash
cd backend
venv\Scripts\activate  # On Windows
source venv/bin/activate  # On Unix or MacOS
uvicorn main:app --reload
```

2. Start the frontend:
```bash
cd frontend
npm start
```

The backend will be available at http://localhost:8000, and the frontend will be available at http://localhost:3000.

## API Documentation

Once the backend is running, you can access the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs


## Project Structure

```
marriage-matchmaking-app/
├── backend/                # FastAPI backend
│   ├── venv/               # Python virtual environment
│   ├── database.py         # Database configuration
│   ├── models.py           # SQLAlchemy models
│   ├── schemas.py          # Pydantic schemas
│   ├── main.py             # FastAPI application
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── package.json        # npm dependencies
│   └── tsconfig.json       # TypeScript configuration
└── README.md               # Project documentation
```


## API Endpoints

- `GET /`: Welcome message
- `POST /users/`: Create a new user profile
- `GET /users/`: Get a list of all user profiles
- `GET /users/{user_id}`: Get a specific user profile by ID
- `PUT /users/{user_id}`: Update a user profile
- `DELETE /users/{user_id}`: Delete a user profile
- `GET /users/{user_id}/matches`: Find potential matches for a user

## Matchmaking Parameters

When finding matches, you can use the following query parameters:
- `min_age`: Minimum age for potential matches
- `max_age`: Maximum age for potential matches
- `city`: Filter matches by city
- `interest_match`: Whether to sort matches by common interests (default: true)

## Data Models

### User
- `id`: Unique identifier
- `name`: User's full name
- `age`: User's age (must be between 18 and 99)
- `gender`: User's gender (male, female, or other)
- `email`: User's email address (must be valid)
- `city`: User's city of residence
- `interests`: List of user's interests

### Interest
- `id`: Unique identifier
- `name`: Name of the interest 
