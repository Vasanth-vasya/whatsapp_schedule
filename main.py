from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
import pywhatkit

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.post("/schedule")
async def schedule(data: dict):

    phone = data["phone"]
    message = data["message"]
    hour = int(data["hour"])
    minute = int(data["minute"])

    pywhatkit.sendwhatmsg(phone, message, hour, minute, 20, True, 3)

    return {"message": "Message Scheduled Successfully ✅"}