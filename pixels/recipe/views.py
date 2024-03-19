from django.shortcuts import render
from django.http import HttpResponse

import json
import requests
from .models import Item, Recipe
from django.core.exceptions import ObjectDoesNotExist

from .forms import DropdownForm
from .functions import *

# with open("recipe/static/recipe/item.json") as jdata:
#     data = json.load(jdata)



with open("recipe/static/recipe/newrecipe.json") as jdata:
    recipedata = json.load(jdata)


# Create your views here.
def index(request):
    """Views for recipe"""

    if request.method == "POST":
        form = DropdownForm(request.POST)
        if form.is_valid():
            selected_recipeID = form.cleaned_data["recipe"]

            try:
                ingredients = recipedata[selected_recipeID]["requiredItems"]

                total = 0
                for i in range(len(ingredients)):
                    ingredient_id = ingredients[i]["id"]
                    ingredients[i]["item_name"] = get_item_name(ingredient_id)
                    
                    
                    ingredients[i]["price"] = get_price(ingredient_id)
                    ingredients[i]["price"] = get_price(ingredient_id)

                    ingredients[i]["total"] = int(ingredients[i]["quantity"])*int(ingredients[i]["price"])

                    total += ingredients[i]["total"]
                
                productname = Recipe.objects.get(id_recipe=selected_recipeID).name_recipe.name_item
                product_id = Item.objects.get(name_item=productname).id_item
                price = get_price(product_id)
                profit = round(0.99*(int(price) - total),0)
                energy = recipedata[selected_recipeID]["EnergyNeeded"]

                try:
                    PE = round(profit/energy,2)
                
                except ZeroDivisionError:
                    PE = " ∞ "

                selected = {
                    "recipe":Recipe.objects.get(id_recipe=selected_recipeID).name_recipe.name_item,
                    "prodCost": total,
                    "price": price,
                    "profit": profit,
                    "energyCost": energy,
                    'PE': PE,

                }
            
                return render(request,"recipe/index.html", {"ingredients":ingredients, "form":form, "selected":selected, "Items":Item.objects.all(), "Recipes":Recipe.objects.all()})
            
            except KeyError:
                print("Keyerr")
                return render(request,"recipe/index.html", {
                       "form": form,
                        "selected":{"recipe":"Error with Key"}
                    } )
        
    return render(request,"recipe/index.html", {
         "form": DropdownForm(),  "Items":Item.objects.all(), "Recipes":Recipe.objects.all()
    } )



def itemdata(request,itemName):
    """return price of the requested item"""
    try:
        price = get_price(Item.objects.get(name_item=itemName).id_item)
        
    except ObjectDoesNotExist:
        price = get_price(itemName)

    return HttpResponse(price)
