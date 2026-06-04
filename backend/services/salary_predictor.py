import logging

logger = logging.getLogger(__name__)

# Deterministic salary table (lower, upper)
SALARY_TABLE = {
    "Entry": {
        "Frontend Developer": (4, 7),
        "Full Stack Developer": (5, 9),
        "Python Developer": (4, 8),
        "Machine Learning Engineer": (6, 12),
        "Data Scientist": (6, 12),
        "Data Engineer": (6, 11),
        "DevOps Engineer": (6, 12),
        "Blockchain Developer": (7, 14),
        "Business Analyst": (4, 7),
    },
    "Mid": {
        "Frontend Developer": (8, 15),
        "Full Stack Developer": (10, 18),
        "Python Developer": (8, 14),
        "Machine Learning Engineer": (12, 22),
        "Data Scientist": (12, 22),
        "Data Engineer": (12, 20),
        "DevOps Engineer": (12, 22),
        "Blockchain Developer": (14, 28),
        "Business Analyst": (8, 14),
    },
    "Senior": {
        "Frontend Developer": (16, 28),
        "Full Stack Developer": (18, 32),
        "Python Developer": (15, 26),
        "Machine Learning Engineer": (22, 40),
        "Data Scientist": (22, 40),
        "Data Engineer": (20, 36),
        "DevOps Engineer": (22, 40),
        "Blockchain Developer": (25, 45),
        "Business Analyst": (15, 25),
    }
}

def predict_salary(predicted_role: str, verified_skills: list) -> str:
    """
    Predicts the salary range based on a deterministic table using the final refined role,
    estimated experience, and skill count.
    """
    try:
        skill_count = len(verified_skills)
        experience_years = max(0, min(skill_count // 2, 10))
        
        if experience_years <= 2:
            exp_level = "Entry"
        elif experience_years <= 5:
            exp_level = "Mid"
        else:
            exp_level = "Senior"
            
        # Get base bounds from table, default to generic fallback if role not found
        role_bounds = SALARY_TABLE[exp_level].get(predicted_role, None)
        if not role_bounds:
            if exp_level == "Entry": role_bounds = (4, 8)
            elif exp_level == "Mid": role_bounds = (8, 15)
            else: role_bounds = (15, 30)
            
        lower, upper = role_bounds
        
        # Skill modifiers
        if skill_count >= 10:
            upper *= 1.10
        elif skill_count < 4:
            lower *= 0.90
            
        return f"₹{lower:.1f} - ₹{upper:.1f} LPA"
        
    except Exception as e:
        logger.error(f"Salary prediction error: {e}")
        return "Unknown Salary (Error Fallback)"
