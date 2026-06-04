import joblib
import os
import logging
import pandas as pd
import numpy as np

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'salary_model.pkl')
COLUMNS_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'salary_columns.pkl')

logger = logging.getLogger(__name__)

try:
    salary_model = joblib.load(MODEL_PATH)
    salary_columns = joblib.load(COLUMNS_PATH)
    MODEL_LOADED = True
except Exception as e:
    logger.error(f"Failed to load Salary models: {e}")
    MODEL_LOADED = False

def predict_salary(predicted_role: str, verified_skills: list) -> str:
    """
    Predicts the salary range based on the predicted role and defaults.
    """
    if not MODEL_LOADED:
        return "$100,000 (Fallback)"
        
    try:
        # Create a DataFrame with zeros for all required columns
        input_data = pd.DataFrame(0, index=[0], columns=salary_columns)
        
        # We don't have exact inputs for experience_level, company_size, etc. from resume.
        # So we can set some sane defaults based on skills count if we want, or just leave as 0.
        # But typically 'remote_ratio', 'work_year' were in the original dataset.
        
        # Let's check if there is a column for the predicted role
        # Example column format: "job_title_Data Scientist" or similar
        role_col = f"job_title_{predicted_role}"
        if role_col in input_data.columns:
            input_data[role_col] = 1
            
        # Optional: set remote_ratio to 50 or 100 if those columns exist
        if 'remote_ratio' in input_data.columns:
            input_data['remote_ratio'] = 50
            
        prediction = salary_model.predict(input_data)[0]
        
        # Format as currency
        return f"${int(prediction):,}"
    except Exception as e:
        logger.error(f"Salary prediction error: {e}")
        return "Unknown Salary (Error Fallback)"
