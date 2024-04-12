from django import forms



from .models import Recipe, Item


recipe_list = Recipe.objects.all()

raw_choices = []
for recipe in recipe_list:
    raw_choices.append(
        (recipe.id_recipe, recipe.name)
    )


choices = sorted(raw_choices, key=lambda x:x[1])

class DropdownForm(forms.Form):
    
    recipe = forms.ChoiceField(
        choices=choices,
        widget=forms.Select(attrs={'id':'selection-list'})
                               )