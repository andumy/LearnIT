from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
import subprocess, json


# Create your views here.
def index(request):
    return HttpResponse('HelloWorld')


@csrf_exempt
def run(request: HttpRequest):
    """
    :param request: http request for this route
    :type request: HttpRequest
    :return: json response for this route
    :rtype: JsonResponse
    """
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        code = body['code']

        fin = open('main.c', 'w')
        fin.write(code)
        fin.close()

        compile_process = subprocess.Popen(['gcc', 'main.c', '-Wall'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = compile_process.communicate()
        compile_process.wait()

        if error is not None:
            response = {
                'error': True,
                'output': error.decode("utf-8")
            }
        else:
            run_process = subprocess.Popen(['./a.out'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            output, error = run_process.communicate()
            response = {
                'error': False if error is None else True,
                'output': output.decode("utf-8")
            }

        clean_process = subprocess.Popen(['rm', '-rf', 'main.c', 'a.out'])
    else:
        response = {
            'error': True,
            'output': 'GET'
        }

    return JsonResponse(response)
