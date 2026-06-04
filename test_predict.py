import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent / "backend"
MODEL_PATH = BASE_DIR / "models" / "hire_reject_pipeline.pkl"

print(f"Loading pipeline from: {MODEL_PATH}")
pipeline = joblib.load(MODEL_PATH)

experience_mapping = {"Junior": 0, "Mid": 1, "Senior": 2}

# Define 3 different resume profiles
resumes = [
    {
        'Skills_Clean': "python java sql react docker",
        'Experience (Years)': 5.0,
        'Education': 'B.Tech',
        'Projects Count': 4.0,
        'AI Score (0-100)': 85.0,
        'Skill_Count': 5.0,
        'Has_Certification': 1.0,
        'High_AI_Score': 1.0,
        'High_Projects': 1.0,
        'Experience_Level': float(experience_mapping["Senior"])
    },
    {
        'Skills_Clean': "html css",
        'Experience (Years)': 1.0,
        'Education': 'B.Sc',
        'Projects Count': 1.0,
        'AI Score (0-100)': 40.0,
        'Skill_Count': 2.0,
        'Has_Certification': 0.0,
        'High_AI_Score': 0.0,
        'High_Projects': 0.0,
        'Experience_Level': float(experience_mapping["Junior"])
    },
    {
        'Skills_Clean': "javascript typescript node aws",
        'Experience (Years)': 3.0,
        'Education': 'M.Tech',
        'Projects Count': 3.0,
        'AI Score (0-100)': 75.0,
        'Skill_Count': 4.0,
        'Has_Certification': 1.0,
        'High_AI_Score': 0.0,
        'High_Projects': 1.0,
        'Experience_Level': float(experience_mapping["Mid"])
    }
]

df = pd.DataFrame(resumes)

print("\n--- Predict Proba for 3 Resumes ---")
probs = pipeline.predict_proba(df)

for i, prob in enumerate(probs):
    print(f"Resume {i+1}: {prob}")
