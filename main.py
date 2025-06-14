from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import os

try:
    import jinja2
except ImportError:
    raise ImportError("Jinja2 is required. Install with: pip install jinja2")

app = FastAPI()

# Vercel-optimized static files setup
templates = Jinja2Templates(directory="templates")

# Vercel requires this handler
app = app

# --- Auth Service ---
def authenticate(username: str, password: str) -> bool:
    return username == "IshikaAgarwal" and password == "SarthakLovesIshika"

# --- Routes ---
@app.get("/debug-images")
async def debug_images():
    import os
    files = os.listdir("static/pics_vids")
    return {"files": files}

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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)