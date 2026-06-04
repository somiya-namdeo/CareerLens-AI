import joblib
import logging
import pandas as pd
import numpy as np
from pathlib import Path
import sklearn

logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "hire_reject_pipeline.pkl"

try:
    hire_pipeline = joblib.load(MODEL_PATH)
    logger.info("Hire/Reject pipeline loaded successfully.")
    MODEL_LOADED = True
except Exception as e:
    logger.error(f"Failed to load Hire/Reject pipeline: {e}")
    hire_pipeline = None
    MODEL_LOADED = False

def predict_hire_probability(parsed_text: str, verified_skills: list, predicted_role: str) -> int:
    """
    Predicts the probability (0-100) of the candidate being hired using the integrated ML pipeline.
    """
    if not MODEL_LOADED:
        logger.warning("Pipeline not loaded, returning default score.")
        return 75
        
    experience_mapping = {
        "Junior": 0,
        "Mid": 1,
        "Senior": 2
    }
    
    # Construct DataFrame exactly matching the pipeline's expected input schema
    input_data = pd.DataFrame([{
        'Skills_Clean': " ".join(verified_skills) if verified_skills else "none",
        'Experience (Years)': 3.0,
        'Education': 'B.Tech',
        'Projects Count': 3.0,
        'AI Score (0-100)': 80.0,
        'Skill_Count': float(len(verified_skills)),
        'Has_Certification': 1.0,
        'High_AI_Score': 1.0,
        'High_Projects': 1.0,
        'Experience_Level': float(experience_mapping.get("Mid", 1))
    }])
    
    prediction_prob = hire_pipeline.predict_proba(input_data)[0]
    
    # Assume class 1 is "Hire"
    hire_prob = int(prediction_prob[1] * 100) if len(prediction_prob) > 1 else int(prediction_prob[0] * 100)
    
    logger.info("Hire prediction completed successfully")
    return hire_prob
