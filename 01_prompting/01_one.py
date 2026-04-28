from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("API_KEY")
if not api_key:
    raise ValueError("API_KEY not found. Add API_KEY=... in your .env file")

client = OpenAI(api_key=api_key)
response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role":"system", "content": "You are an expert in maths and physics. You are also a helpful assistant."},
        {"role": "user", "content": "Hey There what is kolmogorov's component form equation"}
    ]
)
print(response.choices[0].message.content)