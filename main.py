from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

# Vercel-optimized static files setup
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Vercel requires this handler
handler = app

# --- Auth Service ---
def authenticate(username: str, password: str) -> bool:
    return username == "IshikaAgarwal" and password == "SarthakLovesIshika"

# --- Routes ---
@app.get("/", response_class=HTMLResponse)
async def root():
    return RedirectResponse(url="/auth/login", status_code=302)

@app.get("/auth/login", response_class=HTMLResponse)
async def show_login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.post("/auth/login", response_class=HTMLResponse)
async def login(
    request: Request, 
    username: str = Form(...),
    password: str = Form(...)
):
    if authenticate(username, password):
        response = RedirectResponse(url="/dashboard", status_code=302)
        response.set_cookie(key="session", value="valid", httponly=True)
        return response
    return templates.TemplateResponse(
        "login.html",
        {"request": request, "error": "Invalid credentials"},
        status_code=401
    )

# Protected routes
@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request})

@app.get("/storytime", response_class=HTMLResponse)
async def storytime(request: Request):
    return templates.TemplateResponse("storytime.html", {"request": request})

@app.get("/sweetmoments", response_class=HTMLResponse)
async def sweetmoments(request: Request):
    return templates.TemplateResponse("sweetmoments.html", {"request": request})

@app.get("/questionnaire", response_class=HTMLResponse)
async def questionnaire(request: Request):
    return templates.TemplateResponse("questionnaire.html", {"request": request})

@app.get("/piccollage", response_class=HTMLResponse)
async def piccollage(request: Request):
    return templates.TemplateResponse("piccollage.html", {"request": request})

# Health check for Vercel
@app.get("/ping")
async def ping():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))