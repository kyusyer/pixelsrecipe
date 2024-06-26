from django.urls import path

from . import views

app_name = 'recipe'
urlpatterns = [
    path("", views.index, name="index"),
    path("item/<str:itemName>", views.itemdata, name="itemdata"),
    path("energy", views.energy, name="energy"),
    path("resources", views.resources, name="resources"),
    path("resources/<str:industry>", views.industry, name="industry"),
    path("requirement", views.requirement, name="requirement"),
    path("tasks", views.tasks, name="task"),
    path("tasks/add", views.addTask, name="add"),

]



