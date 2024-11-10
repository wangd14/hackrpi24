from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import numpy as np
from sqlalchemy import create_engine, Column, Integer, Float, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import data

app = FastAPI(title="Green Space Optimizer API")

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./greenspace.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class LocationDB(Base):
    __tablename__ = "locations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    latitude = Column(Float)
    longitude = Column(Float)
    area = Column(Float)  # in square feet
    population_density = Column(Float)  # people per square km
    existing_green_space = Column(Integer)  # count within 1km
    sunlight_hours = Column(Float)  # average daily sunlight hours
    created_at = Column(DateTime, default=datetime.utcnow)
    score = Column(Float)

# Pydantic Models for API
class LocationBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    area: float
    population_density: float
    existing_green_space: int
    sunlight_hours: float

class LocationCreate(LocationBase):
    pass

class Location(LocationBase):
    id: int
    score: float
    created_at: datetime

    class Config:
        from_attributes = True

# Scoring Logic
def calculate_location_score(location: LocationBase) -> float:
    """
    Calculate a score for a potential green space location based on various factors.
    Returns a score between 0 and 100.
    """
    # Weights for different factors
    weights = {
        'population_density': 0.35,
        'existing_green_space': 0.25,
        'sunlight_hours': 0.20,
        'area': 0.20
    }
    
    # Normalize and score each factor
    scores = {
        'population_density': min(100, (location.population_density / 10000) * 100),
        'existing_green_space': max(0, 100 - (location.existing_green_space * 20)),  # Lower is better
        'sunlight_hours': (location.sunlight_hours / 12) * 100,
        'area': min(100, (location.area / 20000) * 100)
    }
    
    # Calculate weighted score
    final_score = sum(scores[factor] * weight for factor, weight in weights.items())
    
    return round(final_score, 2)

# Create database tables
def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if we already have data
    if db.query(LocationDB).first() is None:
        for location in data.SAMPLE_LOCATIONS:
            score = calculate_location_score(location)
            db_location = LocationDB(**location, score=score)
            db.add(db_location)
        
        db.commit()
    
    db.close()

# Initialize database with sample data
init_db()


# API Endpoints
@app.post("/locations/", response_model=Location)
async def create_location(location: LocationCreate):
    """Create a new potential green space location"""
    db = SessionLocal()
    try:
        # Calculate score
        score = calculate_location_score(location)
        
        # Create DB model
        db_location = LocationDB(
            **location.dict(),
            score=score
        )
        db.add(db_location)
        db.commit()
        db.refresh(db_location)
        return db_location
    finally:
        db.close()

@app.get("/locations/", response_model=List[Location])
async def get_locations(skip: int = 0, limit: int = 10):
    """Get all potential green space locations"""
    db = SessionLocal()
    try:
        locations = db.query(LocationDB).offset(skip).limit(limit).all()
        return locations
    finally:
        db.close()

@app.get("/locations/{location_id}", response_model=Location)
async def get_location(location_id: int):
    """Get a specific location by ID"""
    db = SessionLocal()
    try:
        location = db.query(LocationDB).filter(LocationDB.id == location_id).first()
        if location is None:
            raise HTTPException(status_code=404, detail="Location not found")
        return location
    finally:
        db.close()

@app.get("/locations/analyze/{location_id}")
async def analyze_location(location_id: int):
    """Get detailed analysis for a specific location"""
    db = SessionLocal()
    try:
        location = db.query(LocationDB).filter(LocationDB.id == location_id).first()
        if location is None:
            raise HTTPException(status_code=404, detail="Location not found")
            
        # Perform detailed analysis
        analysis = {
            "basic_info": {
                "name": location.name,
                "score": location.score,
                "area": location.area
            },
            "impact_metrics": {
                "estimated_users_served": int(location.population_density * (location.area / 43560)),  # Convert to acres
                "carbon_offset_potential": round(location.area * 0.0002, 2),  # Rough estimate of CO2 tons/year
                "heat_island_reduction": "Medium" if location.area > 10000 else "Low"
            },
            "recommendations": {
                "suggested_features": _get_suggested_features(location),
                "maintenance_level": _calculate_maintenance_level(location),
                "estimated_cost": _estimate_cost(location)
            }
        }
        return analysis
    finally:
        db.close()

# Helper functions for analysis
def _get_suggested_features(location: LocationDB) -> List[str]:
    """Suggest features based on location characteristics"""
    features = []
    if location.area > 15000:
        features.extend(["Walking Trails", "Exercise Stations"])
    if location.sunlight_hours > 6:
        features.append("Community Garden")
    if location.population_density > 5000:
        features.extend(["Playground", "Seating Areas"])
    return features

def _calculate_maintenance_level(location: LocationDB) -> str:
    """Calculate required maintenance level"""
    if location.area > 20000:
        return "High"
    elif location.area > 10000:
        return "Medium"
    return "Low"

def _estimate_cost(location: LocationDB) -> dict:
    """Estimate development and maintenance costs"""
    base_cost_per_sqft = 15  # Basic development cost per square foot
    maintenance_cost_per_sqft = 2  # Annual maintenance cost per square foot
    
    development_cost = location.area * base_cost_per_sqft
    annual_maintenance = location.area * maintenance_cost_per_sqft
    
    return {
        "development_cost": round(development_cost, 2),
        "annual_maintenance": round(annual_maintenance, 2)
    }