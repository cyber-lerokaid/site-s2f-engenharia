# S2F Engineering - Full-Stack Integration Guide

This guide details the professional integration between the React frontend and the FastAPI backend for S2F Engineering.

## 1. Python Backend (main.py)

The backend is built with **FastAPI** and handles the following automated tasks:

- **Lead Management**: Endpoint `POST /api/submit-quote` receives and validates lead data.
- **Excel Logging**: Every request is appended to `s2f_leads.xlsx` using **Pandas** and **openpyxl**.
- **Professional PDF Generation**: A technical summary is generated using **FPDF**.
- **Email Automation**: 
  - A confirmation email is sent to the client.
  - A notification email with the **PDF attached** is sent to the commercial team (`mickey_gimli@hotmail.com`).
- **CORS Configuration**: Enabled for all origins to ensure seamless communication with the Vite frontend.

### Backend Setup

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Environment Variables**:
   Create a `.env` file based on `.env.example`:
   ```env
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```

3. **Run Server**:
   ```bash
   python main.py
   ```

## 2. React Frontend (App.tsx)

The frontend uses **React Hooks** to manage the lifecycle of the request:

- **State Management**: `isSubmitting` (loading) and `submitStatus` (idle/success/error) handle the UI feedback.
- **Async Submission**: Uses `fetch` with `async/await` to call the Python API.
- **UX Improvements**:
  - Button state changes from "Enviar Solicitação" to "Processando..." and finally "Sucesso!".
  - Form is automatically cleared upon successful submission.
  - Success/Error modals provide clear feedback to the user.
- **Separation of Concerns**: The form handles official quote requests via API, while the floating WhatsApp button remains a direct, separate communication channel.

## 3. Handling CORS

CORS (Cross-Origin Resource Sharing) is handled in `main.py` using FastAPI's `CORSMiddleware`. This allows the browser to accept requests from your frontend domain (or `localhost` during development).

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 4. Portfolio Ready

This implementation demonstrates:
- Full-stack architecture.
- Document automation (PDF).
- Data persistence (Excel/Pandas).
- Professional email integration.
- Modern UX/UI patterns with React and Tailwind CSS.
