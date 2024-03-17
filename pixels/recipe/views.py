from django.shortcuts import render
from django import forms
from django.http import HttpResponse
import json
import requests
from .models import Item, Recipe
from django.core.exceptions import ObjectDoesNotExist


with open("recipe/static/recipe/recipeID.json") as jdata:
    recipeIDs = json.load(jdata)


# item_list = sorted(list(recipeIDs.keys()))
recipe_list = Recipe.objects.all()

choices = []
for recipe in recipe_list:
    choices.append(
        (recipe.id_recipe, recipe.name_recipe.name_item)
    )



class DropdownForm(forms.Form):
    
    recipe = forms.ChoiceField(choices=choices)



with open("recipe/static/recipe/item.json") as jdata:
    data = json.load(jdata)



with open("recipe/static/recipe/newrecipe.json") as jdata:
    recipedata = json.load(jdata)


# Create your views here.
def index(request):

    if request.method == "POST":
        form = DropdownForm(request.POST)
        if form.is_valid():
            selected_recipeID = form.cleaned_data["recipe"]

            try:
                # #recipeID = recipeIDs[selected_recipeID]
                # ingredients = recipedata[recipeID]["requiredItems"]

                ## Gets the list of ingredienst from the loaded jsonfile
                ingredients = recipedata[selected_recipeID]["requiredItems"]

                total = 0
                for i in range(len(ingredients)):
                    ingredient_id = ingredients[i]["id"]
                    ingredients[i]["item_name"] = get_item_name(ingredient_id)
                    
                    
                    ingredients[i]["price"] = get_price(ingredient_id)
                    ingredients[i]["price"] = get_price(ingredient_id)

                    ingredients[i]["total"] = int(ingredients[i]["quantity"])*int(ingredients[i]["price"])

                    total += ingredients[i]["total"]
                      

                # print(selected_recipeID)
                # print(data[selected_recipeID])      
                
                productname = Recipe.objects.get(id_recipe=selected_recipeID).name_recipe.name_item
                product_id = Item.objects.get(name_item=productname).id_item
                price = get_price(product_id)
                profit = round(0.99*(int(price) - total),0)
                energy = recipedata[selected_recipeID]["EnergyNeeded"]

                try:
                    PE = round(profit/energy,2)
                
                except ZeroDivisionError:
                    PE = "infi: No energy needed"

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
    try:
        price = get_price(Item.objects.get(name_item=itemName).id_item)
        
    except ObjectDoesNotExist:
        price = get_price(itemName)

    return HttpResponse(price)

def get_item_name(id):
    """accepts itemID and return its item name"""
    print(Item.objects.get(id_item=id).name_item)
    return  Item.objects.get(id_item=id).name_item
   
    # for k, d in data.items():

    #     if d == id:
    #         return k
    # return ""


def get_price(id):
    #  print(id,"checxk")
     url = (f"https://pixels-server.pixels.xyz/v1/marketplace/item/{id}?pid=65cf188f507c9890f600014c&v"
                f"=1708071055158.2617")
     
     response = requests.get(url)

     if response.ok:
        response2 = response.json()
        return response2["listings"][0]["price"]
     else:
        return 0