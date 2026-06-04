import joblib
import os
import logging

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'job_role_model.pkl')
TFIDF_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'job_role_tfidf.pkl')

logger = logging.getLogger(__name__)

try:
    role_model = joblib.load(MODEL_PATH)
    role_tfidf = joblib.load(TFIDF_PATH)
    MODEL_LOADED = True
except Exception as e:
    logger.error(f"Failed to load Job Role models: {e}")
    MODEL_LOADED = False

def predict_role(parsed_text: str, verified_skills: list) -> str:
    """
    Predicts the job role based on the extracted skills.
    """
    if not MODEL_LOADED:
        return "Software Engineer (Fallback)"
        
    try:
        # The model was trained on 'Skills_Clean' string
        skills_str = ", ".join(verified_skills)
        X_tfidf = role_tfidf.transform([skills_str])
        prediction = role_model.predict(X_tfidf)[0]
        return prediction
    except Exception as e:
        logger.error(f"Role prediction error: {e}")
        return "Software Engineer (Error Fallback)"
