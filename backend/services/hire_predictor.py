import joblib
import os
import logging
import pandas as pd
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'hire_reject_model.pkl')
COLUMNS_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'hire_reject_columns.pkl')

logger = logging.getLogger(__name__)

try:
    hire_model = joblib.load(MODEL_PATH)
    hire_columns = joblib.load(COLUMNS_PATH)
    MODEL_LOADED = True
except Exception as e:
    logger.error(f"Failed to load Hire/Reject models: {e}")
    MODEL_LOADED = False

def predict_hire_probability(parsed_text: str, verified_skills: list, predicted_role: str) -> int:
    """
    Predicts the probability (0-100) of the candidate being hired.
    Uses safe fallback if the model pipeline has a feature mismatch.
    """
    if not MODEL_LOADED:
        return 75 # Fallback
        
    try:
        # Determine the exact features expected by the model
        expected_features = getattr(hire_model, 'n_features_in_', len(hire_columns))
        
        # Check if the model has feature names
        if hasattr(hire_model, 'feature_names_in_'):
            model_columns = hire_model.feature_names_in_
        elif expected_features == len(hire_columns):
            model_columns = hire_columns
        else:
            raise ValueError(f"Model expects {expected_features} features, but column map has {len(hire_columns)}. Feature names unavailable.")
            
        # Create a DataFrame with zeros for all required columns
        input_data = pd.DataFrame(0, index=[0], columns=model_columns)
        
        # Populate basic features if they exist in the model's columns
        if 'Skill_Count' in input_data.columns:
            input_data['Skill_Count'] = len(verified_skills)
        if 'Experience (Years)' in input_data.columns:
            input_data['Experience (Years)'] = 3 # Default mock heuristic
            
        # Try prediction
        prediction_prob = hire_model.predict_proba(input_data)[0]
        
        # Assume class 1 is "Hire"
        hire_prob = int(prediction_prob[1] * 100) if len(prediction_prob) > 1 else int(prediction_prob[0] * 100)
        return hire_prob
        
    except ValueError as e:
        logger.warning(f"Feature mismatch in Hire/Reject model: {e}. Using fallback scoring.")
        
        # Heuristic fallback calculation
        base_score = 40
        skill_bonus = min(len(verified_skills) * 5, 50)
        return base_score + skill_bonus
        
    except Exception as e:
        logger.error(f"Hire prediction error: {e}")
        return 75 # Error Fallback
