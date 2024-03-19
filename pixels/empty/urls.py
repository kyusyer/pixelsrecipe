from django.urls import path

from . import views

app_name = "empty"

urlpatterns = [
    path("",views.index, name="index")
]