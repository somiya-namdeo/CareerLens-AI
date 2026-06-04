import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from services import pdf_parser, skill_extractor, role_predictor, hire_predictor, salary_predictor, resume_scorer, ocr_classifier

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

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
        
        # Calculate missing skills now that we have the role
        missing_skills = skill_extractor.get_missing_skills(verified_skills, predicted_role)
        
        # Step 5: Predict Salary
        estimated_salary = salary_predictor.predict_salary(predicted_role, verified_skills)
        
        # Step 6: Predict Hire/Reject (Raw Model)
        model_hire_probability = hire_predictor.predict_hire_probability(parsed_text, verified_skills, predicted_role)
        
        # Step 7: Score Resume
        resume_score = resume_scorer.score_resume(verified_skills, missing_skills, model_hire_probability)
        
        # Calibrate Hire Probability
        calibrated_hire_probability = int((0.65 * model_hire_probability) + (0.35 * resume_score))
        
        # Recommendations Mock
        recommendations = [
            f"Consider obtaining certifications relevant to {predicted_role}.",
            "Highlight measurable impacts in your previous project experiences."
        ]
        
        # Limit raw text preview length
        raw_text_preview = parsed_text[:500] + "..." if len(parsed_text) > 500 else parsed_text
        
        return {
            "resume_score": resume_score,
            "hire_probability": calibrated_hire_probability,
            "model_hire_probability": model_hire_probability,
            "predicted_role": predicted_role,
            "ocr_classification": ocr_classification,
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
