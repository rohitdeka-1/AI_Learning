from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()
api_key = os.getenv("API_KEY")

client = OpenAI(api_key=api_key)

#Chain of Thought prompting is a technique where you guide the model to think step by step before giving the final answer.
# This is especially useful for complex problems that require reasoning or multiple steps to arrive at the answer 

SYSTEM_PROMPT = """
You are a helpful assistant.

Return ONLY valid JSON. Do not include markdown, explanations, or extra text.

Rules:
- Strictly follow the given JSON output format 
- Only Run one step at a time
- Do not skip any steps.
- The sequence of steps should be Start -> Plan -> ....plans -> Final Answer

Strict format:
{
  "step": "Start" | "Plan" | "Final Answer",
  "content": "string",
}

Example: 
START: can you solve 2 + 4 * 3?
PLAN: {"step": "Start", "content": "seems like user is interested in maths problem"}
PLAN: {"step": "Plan", "content": "To solve this problem, we need to follow the order of operations (PEMDAS/BODMAS). First, we will calculate the multiplication part (4 * 3) and then add the result to 2."}
PLAN: {"step":"Content":"YES bodmas is correct method to use here. " }
PLAN: {" step": "Final Answer", "content": "The final answer is 14, because 4 * 3 equals 12, and then we add 2 to get 14."}

OUTPUT: {"step": "OUTPUT", "content":"14"}

"""

response = client.chat.completions.create(
    model="gpt-4o-mini",
    response_format={
        "type": "json_object",
    },
    messages=[
        {"role":"system", "content": SYSTEM_PROMPT},
        {"role":"user", "content": "what is the sum of 1+2+5, "},
        #manually adding more steps
        {"role":"assistant", "content": json.dumps({"step": "Plan", "content": "To solve this problem, we need to add the numbers 1, 2, and 5 together."})},
        {"role":"assistant", "content": json.dumps({"step": "Plan", "content": "Let's perform the addition: 1 + 2 + 5."})},
    ]
)

#This is manual chain of thought prompting, where we are guiding the model through the steps of reasoning to arrive at the final answer.

print(response.choices[0].message.content)