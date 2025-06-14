from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Add this ABOVE your existing static mount
app.mount("/pics_vids", StaticFiles(directory="static/pics_vids"), name="pics_vids")  # <-- Note: directory="static/pics_vids"

# Keep your existing static mount for CSS/JS
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# --- AuthService logic ---
def authenticate(username: str, password: str) -> bool:
    return username == "IshikaAgarwal" and password == "SarthakLovesIshika"


# --- Routing ---

# Redirect root to login
@app.get("/", response_class=HTMLResponse)
async def root():
    return RedirectResponse(url="/auth/login", status_code=302)

# Show login page
@app.get("/auth/login", response_class=HTMLResponse)
async def show_login(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

# Handle login form POST
@app.post("/auth/login", response_class=HTMLResponse)
async def login(request: Request, username: str = Form(...), password: str = Form(...)):
    if authenticate(username, password):
        return RedirectResponse(url="/dashboard", status_code=302)
    else:
        return templates.TemplateResponse("login.html", {
            "request": request,
            "error": "Invalid username or password."
        })

# Dashboard page
@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request})

# Storytime page
@app.get("/storytime", response_class=HTMLResponse)
async def storytime(request: Request):
    return templates.TemplateResponse("storytime.html", {"request": request})

# SweetMoments page
@app.get("/sweetmoments", response_class=HTMLResponse)
async def sweetmoments(request: Request):
    return templates.TemplateResponse("sweetmoments.html", {"request": request})

# Questionnaire page
@app.get("/questionnaire", response_class=HTMLResponse)
async def questionnaire(request: Request):
    return templates.TemplateResponse("questionnaire.html", {"request": request})

# PicCollage page
@app.get("/piccollage", response_class=HTMLResponse)
async def piccollage(request: Request):
    return templates.TemplateResponse("piccollage.html", {"request": request})
