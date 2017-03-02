from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpRequest
import subprocess


# Create your views here.
def index(request):
    return HttpResponse('HelloWorld')


def run(request: HttpRequest):
    """
    :param request: http request for this route
    :type request: HttpRequest
    :return: json response for this route
    :rtype: JsonResponse
    """
    fin = open('main.c', 'w')
    fin.write('#include<stdio.h>\n\nint main() {\n\tprintf("Hello world!\\n");\n\treturn 0\n}')
    fin.close()
    compile_process = subprocess.Popen(['gcc', 'main.c', '-Wall'])
    output, error = compile_process.communicate()
    compile_process.wait()
    if error is not None:
        response = {
            'error': True,
            'output': error
        }
    else:
        run_process = subprocess.Popen(['./a.out'], stdout=subprocess.PIPE)
        output, error = run_process.communicate()
        response = {
            'error': False if error is None else True,
            'output': output.decode("utf-8")
        }
    clean_process = subprocess.Popen(['rm', '-rf', 'main.c', 'a.out'])
    return JsonResponse(response)
