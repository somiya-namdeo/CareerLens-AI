import joblib
import os
import logging

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'ocr_role_model.pkl')
TFIDF_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'ocr_tfidf.pkl')

logger = logging.getLogger(__name__)

try:
    ocr_model = joblib.load(MODEL_PATH)
    ocr_tfidf = joblib.load(TFIDF_PATH)
    MODEL_LOADED = True
except Exception as e:
    logger.error(f"Failed to load OCR models: {e}")
    MODEL_LOADED = False

def classify_resume(parsed_text: str) -> str:
    """
    Classifies the resume domain directly from raw text using OCR TF-IDF model.
    """
    if not MODEL_LOADED:
        return "Unknown Domain (Model Not Loaded)"
        
    try:
        X_tfidf = ocr_tfidf.transform([parsed_text])
        prediction = ocr_model.predict(X_tfidf)[0]
        return prediction
    except Exception as e:
        logger.error(f"OCR classification error: {e}")
        return "Classification Error"
