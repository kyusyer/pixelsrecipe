from django.urls import path

from . import views

app_name = 'recipe'
urlpatterns = [
    path("", views.index, name="index"),
    path("item/<str:itemName>", views.itemdata, name="itemdata")

]