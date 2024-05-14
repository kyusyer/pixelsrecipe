from django.contrib import admin
from .models import Item, Recipe, Industry, Energy, Requirement, Task


# Register your models here.


admin.site.register(Item)
admin.site.register(Recipe)
admin.site.register(Industry)
admin.site.register(Energy)
admin.site.register(Requirement)
admin.site.register(Task)
