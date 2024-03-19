from django import forms



from .models import Recipe, Item


recipe_list = Recipe.objects.all()

choices = []
for recipe in recipe_list:
    choices.append(
        (recipe.id_recipe, recipe.name_recipe.name_item)
    )



class DropdownForm(forms.Form):
    
    recipe = forms.ChoiceField(choices=choices)