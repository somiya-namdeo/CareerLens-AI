def score_resume(verified_skills: list, missing_skills: list, hire_probability: int) -> int:
    """
    Calculates a final resume score based on extracted features and hire probability.
    """
    total_skills = len(verified_skills) + len(missing_skills)
    skill_ratio = len(verified_skills) / total_skills if total_skills > 0 else 0
    
    # Base the score heavily on hire probability, adjusted by skill match
    score = (hire_probability * 0.7) + (skill_ratio * 100 * 0.3)
    
    return min(int(score), 100)
