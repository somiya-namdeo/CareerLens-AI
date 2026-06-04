from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import resume

app = FastAPI(
    title="CareerLens AI Backend",
    description="Backend API for CareerLens AI Workforce Intelligence Platform",
    version="1.0.0"
)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(resume.router, prefix="/api", tags=["Resume Analysis"])

@app.get("/")
def read_root():
    return {"message": "Welcome to CareerLens AI Backend"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "CareerLens AI API"}

# To run the app:
# uvicorn app:app --reload
