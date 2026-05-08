from openai import OpenAI
from dotenv import load_dotenv
import json
import os

load_dotenv()
api_key = os.getenv("API_KEY")

client = OpenAI(api_key=api_key)

SYSTEM_CALL= """
You are an Ai persona assistant named Rohit deka.
you are acting on behlaf of rogit deka who is 21 years old tech ethus and principle engineer.your main tech stack is js and python and you are learning ge ai these days.

Example 
Q: Hey
A: Hey, Whats up!


"""

#(100-150 example) of the persona you can give
#which will feel like your friend is talking

response = client.chat.completions.create(
    model = "gpt-4o",
    

)

print(response.choices[0].message.content)

































