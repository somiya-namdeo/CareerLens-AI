# CareerLens AI - Workforce Intelligence Platform

CareerLens AI is an advanced AI-powered resume screening, classification, and scoring engine.

## Local Development

### 1. Backend Setup (FastAPI)
The backend requires Python 3.9+ and relies on several Machine Learning models.

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app:app --reload
```
The backend server will start on `http://127.0.0.1:8000`.

### 2. Frontend Setup (React/Vite)
The frontend requires Node.js 18+.

```bash
cd frontend
npm install
npm run dev
```
The frontend application will start on `http://localhost:5173`.

## Environment Variables

Copy the example environment files and configure as necessary.

**Frontend (`frontend/.env`)**:
```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```
*(Point this to your hosted backend URL when deploying to production).*

**Backend (`backend/.env`)**:
No secret keys are required currently.
```env
# Example .env
PORT=8000
```

## Deployment Instructions

### Deploying the Backend (Render)

1. Create a new **Web Service** on Render.
2. Connect your GitHub repository.
3. Set the **Root Directory** to `backend`.
4. Set the **Build Command** to: `pip install -r requirements.txt`
5. Set the **Start Command** to: `uvicorn app:app --host 0.0.0.0 --port $PORT`
6. Render will automatically assign a `$PORT` environment variable which `uvicorn` will bind to.

### Deploying the Frontend (Vercel)

1. Import your GitHub repository to Vercel.
2. Set the **Root Directory** to `frontend`.
3. Under Environment Variables, add:
   - `VITE_API_BASE_URL` = `https://<your-render-backend-url>.onrender.com`
4. The build framework will automatically be detected as Vite (`npm run build`).
5. Click **Deploy**.

## Model Requirements
The active machine learning models are stored in `backend/models/`. Do not delete the `.pkl` files unless you intend to retrain them using the source `.ipynb` notebooks in the `notebooks/` directory.
