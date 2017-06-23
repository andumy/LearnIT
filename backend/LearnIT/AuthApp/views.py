from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from CoreApp import services
import json


@csrf_exempt
def login(request: HttpRequest):
    if request.method != 'POST':
        json_response = JsonResponse(
            {
                'internal': True,
                'error': True,
                'output': 'Internal error: api call method is not POST'
            }
        )
        services.set_response_headers(json_response)
        return json_response

    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)

    if user is not None:
        json_body = {'ok': 'POST'}
        json_response = JsonResponse(json_body)
        services.set_response_headers(json_response)
        return json_response

    json_body = {'nok': 'GET'}
    json_response = JsonResponse(json_body)
    services.set_response_headers(json_response)
    return json_response

