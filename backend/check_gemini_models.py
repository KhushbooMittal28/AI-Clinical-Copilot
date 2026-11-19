from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing.")

client = genai.Client(api_key=api_key)

print("\nChecking available Gemini models...\n")

try:
    for model in client.models.list():
        supported_actions = getattr(
            model, "supported_actions", []
        )

        if "generateContent" in supported_actions:
            print(model.name)

except Exception as error:
    print("Model listing failed:")
    print(type(error).__name__, error)