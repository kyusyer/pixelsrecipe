from django.contrib import admin
from .models import Item, Recipe, Industry, Energy


# Register your models here.


admin.site.register(Item)
admin.site.register(Recipe)
admin.site.register(Industry)
admin.site.register(Energy)
