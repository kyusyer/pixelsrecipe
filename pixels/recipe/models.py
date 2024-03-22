from django.db import models

# Create your models here.

class Item(models.Model):
    id_item = models.CharField(max_length=64)
    name_item = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name_item}  ({self.id_item})"

class Recipe(models.Model):
    id_recipe = models.CharField(max_length=64)
    name_recipe = models.ForeignKey(Item,on_delete=models.CASCADE, related_name="product" )

    def __str__(self):
        return f"{self.id_recipe} {self.name_recipe}"
    


class Industry(models.Model):
    type = models.CharField(max_length=64)
    industry = models.CharField(max_length=64)
    name_item = models.ForeignKey(Item,on_delete=models.CASCADE, related_name="Group")


    def __str__(self):
        return f"{self.industry} -- {self.name_item}"


