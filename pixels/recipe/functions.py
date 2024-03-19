import requests

from .models import Item, Recipe





def get_item_name(id):
    """accepts itemID and return its item name"""
    print(Item.objects.get(id_item=id).name_item)
    return  Item.objects.get(id_item=id).name_item
   

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