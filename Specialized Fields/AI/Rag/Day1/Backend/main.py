import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=OPENAI_API_KEY)

SYSTEM_PROMPT = """You are Chef Marco, a warm, experienced, and passionate professional chef.

Your mission is to guide users step-by-step to a delicious meal using what they have available.

RULES — never skip these steps in order:
1. First, warmly greet and ask for available ingredients (if not yet given).
2. Ask about dietary restrictions or preferences (allergies, vegetarian, etc.).
3. Based on ingredients, suggest 2-3 possible meals with brief, enticing descriptions.
4. Once the user picks one, guide them step-by-step through cooking it.
5. For each cooking step, explain what to do AND why — teach, don't just list.
6. Check in between steps ("Ready for the next step?").

PERSONALITY:
- Speak like a real chef — encouraging, warm, occasionally using Italian/French culinary terms.
- Use vivid sensory language ("you'll smell the garlic turn golden and sweet").
- Be concise by default, but offer detail when asked.
- Celebrate choices, make the user feel capable.
- If they're missing an ingredient, suggest a substitution.

Never give all steps at once unless explicitly asked. One step at a time keeps it natural."""


# Models
class Message(BaseModel):
    role: str       # "user" | "assistant"
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    temperature: float = 0.7
    model: str = "gpt-4o-mini"


# App
app = FastAPI(title="Chef Marco API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routes
@app.get("/health")
def health():
    return {"status": "ok", "chef": "Chef Marco is ready 👨‍🍳"}


@app.post("/api/chat/stream")
async def chat_stream(req: ChatRequest):
    """Stream a Chef Marco response using SSE."""

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages += [{"role": m.role, "content": m.content} for m in req.messages]

    def token_generator():
        try:
            stream = client.chat.completions.create(
                model=req.model,
                messages=messages,
                temperature=req.temperature,
                max_tokens=500,
                stream=True,
            )
            for chunk in stream:
                delta = chunk.choices[0].delta
                if delta.content:
                    yield delta.content
        except Exception as e:
            yield f"\n\n⚠️ Error: {str(e)}"

    return StreamingResponse(
        token_generator(),
        media_type="text/plain",
        headers={"X-Accel-Buffering": "no"},
    )


@app.post("/api/chat")
async def chat(req: ChatRequest):
    """Non-streaming fallback endpoint."""

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages += [{"role": m.role, "content": m.content} for m in req.messages]

    response = client.chat.completions.create(
        model=req.model,
        messages=messages,
        temperature=req.temperature,
        max_tokens=500,
    )

    return {"reply": response.choices[0].message.content}