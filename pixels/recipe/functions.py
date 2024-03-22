import requests

from .models import Item, Recipe, Industry





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
     



def get_products(industry):

    items = Industry.objects.filter(industry=industry)

    products = []

    for item in items:

        name = item.name_item.name_item
        id = item.name_item.id_item

        market_price =  get_price(id)
        product_data = {   
                "name":name,
                "energy_needed":3,
                "market_price":market_price,
                "profit":0,
                "pe":0
            }

        products.append(product_data)

    return products