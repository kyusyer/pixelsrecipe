import os
import json
import django

# Set the Django settings module (replace "pixels.settings" with your actual project's settings module)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "pixels.settings")
django.setup()

from recipe.models import Recipe, Item  # Replace with your actual model names

def populate_recipe_from_json(json_file_path):
    try:
        with open(json_file_path, 'r') as json_file:
            data = json.load(json_file)
            # print(data)
            for recipename, achid in data.items():
                try:
                    item_instance = Item.objects.get(name_item=recipename)  # Use id_item instead of id
                    Recipe.objects.create(
                        name_recipe=item_instance,
                        id_recipe=achid
                    )
                    print(f"Recipe '{recipename}' successfully populated.")
                except Item.DoesNotExist:
                    print(f"Item with ID '{recipename}' not found. Recipe '{achid}' skipped.")
    except FileNotFoundError:
        print(f"File {json_file_path} not found.")
    except Exception as e:
        print(f"Error populating data: {str(e)}")

# Call the function with the path to your JSON file
json_file_path = "recipe/static/recipe/recipeID.json"
populate_recipe_from_json(json_file_path)
