def clean_text(text: str) -> str:
    """
    Cleans raw resume text for model inference.
    """
    
    return text.lower().strip()
