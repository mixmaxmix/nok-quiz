from django.shortcuts import render

# Create your views here.

def result(request):
    return render(request, 'main/result.html', {'title': 'Результат'})

def index(request):
    return render(request, 'main/index.html', {'title': 'Тестирование'})

def prequiz(request):
    return render(request, 'main/quizpre.html', {'title': 'Тестирование'})