import re

TECH_SKILLS = [
    "Python", "Java", "C++", "C#", "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", 
    "FastAPI", "Django", "Flask", "Spring Boot", "SQL", "MySQL", "PostgreSQL", "MongoDB", "NoSQL",
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Machine Learning", "Deep Learning", "NLP", 
    "Computer Vision", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy", "Spark", "Hadoop",
    "Tableau", "Power BI", "Data Analysis", "DevOps", "CI/CD", "Git", "Linux", "Excel", "Data Science"
]

ROLE_REQUIREMENTS = {
    "Machine Learning Engineer": ["Python", "Machine Learning", "TensorFlow", "PyTorch", "Scikit-Learn", "SQL"],
    "Data Scientist": ["Python", "Machine Learning", "Pandas", "SQL", "Data Science"],
    "Data Analyst": ["Python", "SQL", "Excel", "Tableau", "Data Analysis"],
    "Software Engineer": ["Java", "Python", "C++", "JavaScript", "Git", "SQL"],
    "Web Developer": ["JavaScript", "React", "Node.js", "TypeScript", "FastAPI"],
    "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"]
}

def extract_skills(parsed_text: str):
    """
    Extracts verified skills from the resume text using heuristic keyword matching.
    Returns the verified skills and a default empty list for missing skills.
    The missing skills will be calculated later when the job role is predicted.
    """
    text_lower = parsed_text.lower()
    verified_skills = []
    
    for skill in TECH_SKILLS:
        # Create a word boundary regex to avoid partial matches
        # E.g., 'C' shouldn't match inside 'React'
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        if re.search(pattern, text_lower) or skill.lower() in text_lower:
            # Simple fallback check for multi-word skills like "Machine Learning"
            verified_skills.append(skill)
            
    # Remove duplicates
    verified_skills = list(set(verified_skills))
    
    return verified_skills

def get_missing_skills(verified_skills: list, predicted_role: str):
    """
    Determine missing skills based on role requirements.
    """
    required = ROLE_REQUIREMENTS.get(predicted_role, ["Python", "SQL", "Git"]) # Fallback requirements
    
    missing_skills = [skill for skill in required if skill not in verified_skills]
    return missing_skills
