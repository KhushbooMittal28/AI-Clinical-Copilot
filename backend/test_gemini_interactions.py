
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is missing.")

client = genai.Client(api_key=api_key)

try:
    interaction = client.interactions.create(
        model="gemini-3.5-flash-lite",
        input="Explain hypertension in two simple sentences."
    )

    print("\n========== GEMINI RESPONSE ==========\n")
    print(interaction.output_text)

except Exception as error:
    print("\n========== API ERROR ==========\n")
    print(type(error).__name__)
    print(error)
