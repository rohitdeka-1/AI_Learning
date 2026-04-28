from openai import OpenAI
from dotenv import load_dotenv
import os
import json


load_dotenv()
api_key = os.getenv("API_KEY")

client = OpenAI(api_key=api_key)


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

message_history = [
    {"role":"system", "content": SYSTEM_PROMPT},
]

user_query = input("👉")
message_history.append({"role":"user", "content" : user_query })


print("\n\n\n")

while True:
    response = client.chat.completions.create(
        model ="gpt-4o-mini",
        response_format = {
            "type" : "json_object"
        },
        messages=message_history
    )
    raw_result = response.choices[0].message.content
    message_history.append({"role":"assistant", "content":raw_result})
    parsed_result = json.loads(raw_result)

    if(parsed_result.get("step") == "Start" ):
        print("Starting engine.....",parsed_result.get("content"))
        continue
    if(parsed_result.get("step") == "Plan" ):
        print("Thinking.....",parsed_result.get("content"))
        continue
    if(parsed_result.get("step") == "Final Answer" ):
        print("Starting engine.....",parsed_result.get("content"))
        break

print("\n\n\n")


 