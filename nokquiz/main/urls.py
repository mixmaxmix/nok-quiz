from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('pre/', views.prequiz),
    path('result/', views.result),
]