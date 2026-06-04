import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from services import pdf_parser, skill_extractor, role_predictor, hire_predictor, salary_predictor, resume_scorer, ocr_classifier

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def refine_role(parsed_text: str, ocr_classification: str, predicted_role: str, verified_skills: list) -> str:
    # 1. Title matching in first 1000 chars
    text_preview = parsed_text[:1000].lower()
    
    titles = [
        "Python Developer", "Frontend Developer", "Full Stack Developer",
        "Backend Developer", "Java Developer", "Data Scientist",
        "Machine Learning Engineer", "Data Analyst", "Business Analyst",
        "ETL Developer", "Data Engineer", "Database Developer",
        "DevOps Engineer", "Blockchain Developer"
    ]
    
    for title in titles:
        if title.lower() in text_preview:
            return title
            
    # 2. OCR mapping fallback
    ocr_map = {
        "pythondeveloper": "Python Developer",
        "frontenddeveloper": "Frontend Developer",
        "businessanalyst": "Business Analyst",
        "etldeveloper": "ETL Developer",
        "datascience": "Data Scientist",
        "databasedeveloper": "Database Developer",
        "blockchain": "Blockchain Developer"
    }
    
    ocr_lower = str(ocr_classification).lower().replace(" ", "")
    if ocr_lower in ocr_map:
        return ocr_map[ocr_lower]
        
    # 3. Skill-based heuristics fallback
    skills_lower = [s.lower() for s in verified_skills]
    
    if any(s in skills_lower for s in ["node.js", "express", "mongodb"]):
        return "Full Stack Developer"
    if any(s in skills_lower for s in ["react", "typescript", "javascript", "html", "css", "tailwind css"]):
        return "Frontend Developer"
    if "python" in skills_lower and any(s in skills_lower for s in ["machine learning", "data science", "tensorflow", "pytorch", "scikit-learn"]):
        return "Machine Learning Engineer"
    if "python" in skills_lower and any(s in skills_lower for s in ["pandas", "numpy", "sql", "data science"]):
        return "Data Scientist"
    if "sql" in skills_lower and "excel" in skills_lower and any(s in skills_lower for s in ["power bi", "tableau"]):
        return "Data Analyst"
    if any(s in skills_lower for s in ["hadoop", "spark", "hive", "etl"]):
        return "Data Engineer"
    if any(s in skills_lower for s in ["aws", "docker", "kubernetes", "devops"]):
        return "DevOps Engineer"
    if any(s in skills_lower for s in ["blockchain", "solidity", "web3"]):
        return "Blockchain Developer"
        
    return predicted_role

def get_display_domain(final_role: str) -> str:
    mapping = {
        "Frontend Developer": "Frontend Development",
        "Full Stack Developer": "Full Stack Development",
        "Machine Learning Engineer": "AI/ML",
        "Data Scientist": "Data Science",
        "Data Engineer": "Data Engineering",
        "DevOps Engineer": "DevOps",
        "Blockchain Developer": "Blockchain",
        "Business Analyst": "Business Analysis",
        "Python Developer": "Python Development"
    }
    return mapping.get(final_role, final_role)

@router.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    # Save the file temporarily
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    try:
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")
    
    try:
        # Step 1: Parse PDF text
        parsed_text = pdf_parser.extract_text(file_path)
        
        # Step 2: Extract skills (OCR Classification logic / NLP)
        verified_skills = skill_extractor.extract_skills(parsed_text)
        
        # Step 3: OCR Text Classification
        ocr_classification = ocr_classifier.classify_resume(parsed_text)
        
        # Step 4: Predict Job Role
        predicted_role = role_predictor.predict_role(parsed_text, verified_skills)
        
        # Refine role based on skills
        final_role = refine_role(parsed_text, ocr_classification, predicted_role, verified_skills)
        display_domain = get_display_domain(final_role)
        
        # Calculate missing skills now that we have the role
        missing_skills = skill_extractor.get_missing_skills(verified_skills, final_role)
        
        # Step 5: Predict Salary
        estimated_salary = salary_predictor.predict_salary(final_role, verified_skills)
        
        # Step 6: Predict Hire/Reject (Raw Model)
        model_hire_probability = hire_predictor.predict_hire_probability(parsed_text, verified_skills, final_role)
        
        # Step 7: Score Resume
        resume_score = resume_scorer.score_resume(verified_skills, missing_skills, model_hire_probability)
        
        # Calibrate Hire Probability
        calibrated_hire_probability = int((0.45 * model_hire_probability) + (0.55 * resume_score))
        
        if len(verified_skills) < 3:
            calibrated_hire_probability = min(calibrated_hire_probability, 75)
        if len(missing_skills) >= 5:
            calibrated_hire_probability = min(calibrated_hire_probability, 80)
        if resume_score < 60:
            calibrated_hire_probability = min(calibrated_hire_probability, 70)
        if resume_score > 85 and len(verified_skills) >= 5:
            calibrated_hire_probability = min(calibrated_hire_probability, 95) # Allow up to 95
        else:
            # General cap if not exceptional
            calibrated_hire_probability = min(calibrated_hire_probability, 90)
            
        # Recommendations Mock
        recommendations = [
            f"Consider obtaining certifications relevant to {final_role}.",
            "Highlight measurable impacts in your previous project experiences."
        ]
        
        # Limit raw text preview length
        raw_text_preview = parsed_text[:500] + "..." if len(parsed_text) > 500 else parsed_text
        
        return {
            "resume_score": resume_score,
            "hire_probability": calibrated_hire_probability,
            "model_hire_probability": model_hire_probability,
            "predicted_role": final_role,
            "ocr_classification": display_domain,
            "estimated_salary": estimated_salary,
            "verified_skills": verified_skills,
            "missing_skills": missing_skills,
            "recommendations": recommendations,
            "raw_text_preview": raw_text_preview
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")
    finally:
        # Clean up temporary file
        if os.path.exists(file_path):
            os.remove(file_path)
