from django.db import models

# Create your models here.

class Item(models.Model):
    id_item = models.CharField(max_length=64)
    name_item = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name_item}  ({self.id_item})"

class Recipe(models.Model):
    id_recipe = models.CharField(max_length=64, unique=True)
    name_recipe = models.ForeignKey(Item,on_delete=models.CASCADE, related_name="product" )
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return f"Recipe_id: {self.id_recipe}_______Recipe_name: {self.name}________{self.name_recipe.name_item}"
    


class Industry(models.Model):
    type = models.CharField(max_length=64)
    industry = models.CharField(max_length=64)
    name_item = models.ForeignKey(Item,on_delete=models.CASCADE, related_name="Group")


    def __str__(self):
        return f"{self.industry} -- {self.name_item}"
    

class Energy(models.Model):
    item_name = models.ForeignKey(Item, on_delete=models.CASCADE)
    energy = models.FloatField()

    def __str__(self):
        return f"{self.item_name} {self.energy}"
    

class Requirement(models.Model):
    item_name = models.CharField(max_length=64)
    required_energy = models.FloatField()
    capital = models.IntegerField()
    out_quantity = models.FloatField()

    def __str__(self):
        return self.item_name
    

class Task(models.Model):
    task = models.CharField(max_length=64)



