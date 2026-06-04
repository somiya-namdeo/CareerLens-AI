import re

TECH_SKILLS = {
    "Python": ["python"],
    "Java": ["java"],
    "C++": ["c++", "cpp"],
    "JavaScript": ["javascript", "js"],
    "TypeScript": ["typescript", "ts"],
    "React": ["react", "react.js", "reactjs"],
    "HTML": ["html", "html5"],
    "CSS": ["css", "css3"],
    "Tailwind CSS": ["tailwind css", "tailwindcss", "tailwind"],
    "Node.js": ["node.js", "node", "nodejs"],
    "Express": ["express", "express.js", "expressjs"],
    "SQL": ["sql"],
    "MySQL": ["mysql"],
    "MongoDB": ["mongodb", "mongo"],
    "Git": ["git"],
    "GitHub": ["github"],
    "Docker": ["docker"],
    "Kubernetes": ["kubernetes", "k8s"],
    "AWS": ["aws", "amazon web services"],
    "Azure": ["azure"],
    "GCP": ["gcp", "google cloud platform"],
    "TensorFlow": ["tensorflow", "tensor flow"],
    "PyTorch": ["pytorch"],
    "Scikit-learn": ["scikit-learn", "scikit learn", "sklearn"],
    "Pandas": ["pandas"],
    "NumPy": ["numpy"],
    "Machine Learning": ["machine learning", "machine-learning", "ml"],
    "Deep Learning": ["deep learning", "deep-learning", "dl"],
    "NLP": ["nlp", "natural language processing"],
    "Computer Vision": ["computer vision", "cv"],
    "Data Science": ["data science", "datascience"],
    "Spark": ["spark", "apache spark"],
    "Hadoop": ["hadoop"],
    "Hive": ["hive"],
    "ETL": ["etl"],
    "Tableau": ["tableau"],
    "Power BI": ["power bi", "powerbi"],
    "Excel": ["excel"],
    "Blockchain": ["blockchain"],
    "Solidity": ["solidity"],
    "Web3": ["web3"],
    "FastAPI": ["fastapi"],
    "Flask": ["flask"],
    "Django": ["django"],
    "Angular": ["angular"],
    "Vue": ["vue"],
    "Spring Boot": ["spring boot"],
    "PostgreSQL": ["postgresql", "postgres"],
    "NoSQL": ["nosql"],
    "Data Analysis": ["data analysis"],
    "DevOps": ["devops"],
    "CI/CD": ["ci/cd", "cicd"],
    "Linux": ["linux"]
}

ROLE_REQUIREMENTS = {
    "Data Scientist / ML Engineer": ["Python", "Machine Learning", "Pandas", "SQL", "Data Science", "Scikit-learn"],
    "ETL Developer / Data Engineer": ["Python", "SQL", "ETL", "Spark", "Hadoop"],
    "Python Developer": ["Python", "Django", "Flask", "FastAPI", "SQL", "Git"],
    "Blockchain Developer": ["Blockchain", "Solidity", "Web3", "JavaScript"],
    "Business Analyst": ["Excel", "SQL", "Tableau", "Power BI", "Data Analysis"],
    "Software Engineer": ["Java", "Python", "C++", "JavaScript", "Git", "SQL"],
    "Machine Learning Engineer": ["Python", "Machine Learning", "TensorFlow", "PyTorch", "Scikit-learn", "SQL"],
    "Data Scientist": ["Python", "Machine Learning", "Pandas", "SQL", "Data Science"],
    "Data Analyst": ["Python", "SQL", "Excel", "Tableau", "Data Analysis"],
    "Web Developer": ["JavaScript", "React", "Node.js", "TypeScript", "FastAPI"],
    "DevOps Engineer": ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"]
}

def extract_skills(parsed_text: str):
    """
    Extracts verified skills from the resume text using heuristic keyword matching.
    """
    text_lower = parsed_text.lower()
    verified_skills = []
    
    for standard_skill, variants in TECH_SKILLS.items():
        for variant in variants:
            # Word boundary regex to strictly avoid partial substring matches (e.g. 'ts' inside 'assets')
            pattern = r'\b' + re.escape(variant) + r'\b'
            if re.search(pattern, text_lower):
                verified_skills.append(standard_skill)
                break
                
    return list(set(verified_skills))

def get_missing_skills(verified_skills: list, predicted_role: str):
    """
    Determine missing skills based on role requirements.
    """
    required = ROLE_REQUIREMENTS.get(predicted_role, ["Python", "SQL", "Git"]) # Fallback requirements
    missing_skills = [skill for skill in required if skill not in verified_skills]
    return missing_skills
