<div align="center">
  <img src="frontend/src/assets/logo/careerlens-logo.png" alt="CareerLens AI Logo" width="120" />

  <h1>CareerLens AI</h1>
  <p><strong>Advanced AI-Powered Resume Intelligence Platform</strong></p>

  <p>
    <a href="https://careerlens-ai-fpzy.onrender.com"><img src="https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" /></a>
    <a href="#"><img src="https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" /></a>
    <img src="https://img.shields.io/badge/Machine%20Learning-Python%20%7C%20Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Machine Learning" />
    <img src="https://img.shields.io/badge/Author-Somiya%20Namdeo-blue?style=for-the-badge" alt="Author" />
  </p>

  <p>
    <strong>Live Application:</strong> <a href="https://career-lens-ai-two.vercel.app/">https://careerlens-ai.vercel.app</a><br>
    <strong>Backend API:</strong> <a href="https://careerlens-ai-fpzy.onrender.com">https://careerlens-ai-fpzy.onrender.com</a><br>
    <strong>API Documentation:</strong> <a href="https://careerlens-ai-fpzy.onrender.com/docs">https://careerlens-ai-fpzy.onrender.com/docs</a>
  </p>
</div>

---

## Overview

CareerLens AI bridges the gap between raw applicant data and objective hiring decisions. In the modern recruitment landscape, parsing thousands of resumes manually is inefficient and prone to human bias. 

This platform leverages an Optical Character Recognition (OCR) pipeline fused with Natural Language Processing (NLP) and Ensemble Machine Learning algorithms to autonomously ingest resumes, predict job roles, forecast market salaries, and calculate statistical hiring probabilities.

Built as a full-stack, end-to-end Machine Learning web application, CareerLens AI demonstrates the seamless integration of predictive analytics into a beautiful, enterprise-grade React interface.

## Project Highlights

- Full-Stack AI Resume Intelligence Platform
- OCR-Based Resume Parsing
- Resume Scoring Engine
- Job Role Prediction
- Salary Estimation
- Hire Probability Prediction
- Skill Gap Analysis
- FastAPI Backend
- React Frontend
- Machine Learning Inference Pipeline
- Render + Vercel Deployment

---

## Key Features

- **Resume Upload & Parsing:** High-fidelity text extraction via PyMuPDF.
- **OCR Text Extraction:** Image-to-text fallback digitization for non-text-based resumes.
- **Resume Intelligence Report:** A comprehensive, visually stunning breakdown of candidate viability.
- **Job Role Prediction:** Automatic classification of candidate domains based on historical NLP data.
- **Salary Estimation:** Market-aligned salary forecasting (R² Score: 0.57) based on skills and seniority.
- **Hire Probability Prediction:** Random Forest modeling calculating the exact likelihood of a successful hire (94.2% Accuracy).
- **Verified & Missing Skills Detection:** Automated technical skill gap analysis.
- **Resume Scoring:** Custom heuristic algorithm grading the resume against industry standards.
- **Interactive Dashboard & Workspace:** A highly responsive React/Vite environment.
- **Model Insights Page:** Transparent breakdown of active ML model architectures and validation metrics.
- **API Documentation:** Fully documented backend endpoints via FastAPI/Swagger.

---

## Technology Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-111827?style=for-the-badge)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white)

### Machine Learning
![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)
![TF-IDF](https://img.shields.io/badge/TF--IDF-111827?style=for-the-badge)
![Random Forest](https://img.shields.io/badge/Random_Forest-0F766E?style=for-the-badge)
![Logistic Regression](https://img.shields.io/badge/Logistic_Regression-7C3AED?style=for-the-badge)
![PyMuPDF](https://img.shields.io/badge/PyMuPDF-16A34A?style=for-the-badge)
![OCR Processing](https://img.shields.io/badge/OCR_Processing-DC2626?style=for-the-badge)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
## System Architecture

```mermaid
flowchart TD

User --> ReactFrontend
ReactFrontend --> FastAPIBackend

FastAPIBackend --> ResumeParser
FastAPIBackend --> OCREngine
FastAPIBackend --> SkillExtraction
FastAPIBackend --> MLInferenceEngine

MLInferenceEngine --> HirePrediction
MLInferenceEngine --> RolePrediction
MLInferenceEngine --> SalaryPrediction
MLInferenceEngine --> OCRClassification

HirePrediction --> IntelligenceReport
RolePrediction --> IntelligenceReport
SalaryPrediction --> IntelligenceReport
OCRClassification --> IntelligenceReport
```
---

## Machine Learning Models & Performance

CareerLens AI utilizes four specialized Machine Learning models trained on proprietary HR datasets. 

| Pipeline Objective | Algorithm | Primary Metric | Score |
| :--- | :--- | :--- | :--- |
| **Hire / Reject Prediction** | Random Forest Classifier | Accuracy<br>F1 Score | **94.2%**<br>0.92 |
| **Job Role Prediction** | Random Forest + TF-IDF | Accuracy<br>F1 Score | **84.6%**<br>0.84 |
| **OCR Resume Classification**| TF-IDF + Random Forest | Accuracy<br>F1 Score | **84.6%**<br>0.84 |
| **Salary Prediction** | Tuned Random Forest Regressor | R² Score<br>RMSE | **0.57**<br>40,552 |

---

## Platform Screenshots

### Landing Page
![Landing Page 1](assets/landing-page-01.png)
![Landing Page 2](assets/landing-page-02.png)

### Resume Upload & Analysis
![Upload Resume](assets/upload-01.png)
![Resume Workspace](assets/resume-02.png)

### Results Dashboard
![Results 1](assets/results-01.png)
![Results 2](assets/results-02.png)

### Model Insights
![Model Insights 1](assets/model-insights-01.png)
![Model Insights 2](assets/model-insights-02.png)




---

## Backend API Endpoints

### `POST /api/analyze-resume`
Extracts, parses, and runs inference on a candidate's resume.

**Request:** `multipart/form-data`
- `file`: PDF Resume Document

**Response:**
```json
{
  "resume_score": 85,
  "hire_probability": 92,
  "model_hire_probability": 88,
  "predicted_role": "Data Scientist",
  "ocr_classification": "Data Science",
  "estimated_salary": "₹8.5 - ₹16.2 LPA",
  "verified_skills": ["Python", "Machine Learning", "SQL", "Pandas"],
  "missing_skills": ["Deep Learning", "Docker"],
  "recommendations": [
    "Consider obtaining certifications relevant to Data Scientist.",
    "Highlight measurable impacts in your previous project experiences."
  ],
  "raw_text_preview": "...",
  "extracted_text": "...",
  "page_count": 1,
  "word_count": 450,
  "character_count": 3120,
  "extraction_method": "pymupdf"
}
```

---

## Local Setup Instructions

### 1. Backend (FastAPI)
```bash
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app:app --reload
```
*Backend runs on `http://127.0.0.1:8000`*

### 2. Frontend (React/Vite)
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## Repository Structure

```text
CareerLens-AI/
├── frontend/             # React + Vite Application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Application routes
│   │   └── assets/       # Frontend images and SVGs
│   └── .env.example
├── backend/              # FastAPI Application
│   ├── models/           # Compiled .pkl Machine Learning Models
│   ├── routes/           # API Endpoint logic
│   ├── services/         # Extraction & Inference services
│   └── .env.example
├── notebooks/            # Jupyter Notebooks (Model Training & EDA)
├── datasets/             # Training Data & Corpora
├── assets/               # README assets and documentation images
└── README.md
```

---

## Future Enhancements

- Large Language Model (LLM) Integration: Augmenting static NLP with Generative AI for customized interview question generation.
- Batch Processing Dashboard: Allow HR managers to drag-and-drop 100+ resumes and export a ranked CSV leaderboard.
- Live Job Market Sync: Connecting the salary prediction model to real-time APIs like Glassdoor or LinkedIn to auto-adjust for inflation and regional demand.

---

## Author

**Somiya Namdeo**
