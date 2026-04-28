from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("API_KEY")

SYSTEM_PROMPT = """
You are a coding-only assistant.

Rules:
- Only answer programming or software development related questions.
- If the question is NOT related to coding, respond EXACTLY with:
"Sorry, I can only answer programming related questions."
- Do not explain anything else.
"""


client = OpenAI(api_key=api_key)
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role":"system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": "Hey There what is kolmogorov's component form equation"}
    ]
)
print(response.choices[0].message.content) 