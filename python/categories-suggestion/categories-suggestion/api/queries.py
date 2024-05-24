import json
import os

async def fetch_available_texts():
    file_path = os.getenv('FOOD_DESCRIPTIONS_PATH', '/code/food_descriptions.json')
    with open(file_path, 'r') as file:
        topics_dict = json.load(file)
    return topics_dict["items"]
