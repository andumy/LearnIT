from django.shortcuts import render
from django.http import HttpResponse, JsonResponse


# Create your views here.
def index(request):
    return HttpResponse('HelloWorld')


def run(request):
    response = {}
    response['error'] = True
    response['data'] = 'compile error'
    return JsonResponse(response)
