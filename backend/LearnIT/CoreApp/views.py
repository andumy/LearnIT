from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from . import services
import json


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
    if request.method != 'POST':
        return JsonResponse(
            {
                'error': True,
                'output': 'Internal error: api call method is not POST'
            }
        )

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    code = body.get('code')
    if code is None:
        return JsonResponse(
            {
                'error': True,
                'output': 'Internal error: The \'code\' key was not found in request'
            }
        )

    filename = 'main'

    try:
        services.write_file(filename, code)

        output_c, error_c = services.compile_file(filename)

        if error_c == b'':
            output_r, error_r = services.run_exec(filename)
            if error_r == b'':
                response = {
                    'error': False,
                    'output': output_r.decode('utf-8')
                }
            else:
                response = {
                    'error': True,
                    'output': error_r.decode('utf-8')
                }
        else:
            response = {
                'error': True,
                'output': error_c.decode("utf-8")
            }
    except Exception as e:
        response = {
            'error': True,
            'Internal exception': e.__traceback__
        }
        pass

    services.clean(filename)

    return JsonResponse(response)


@csrf_exempt
def level(request: HttpRequest):
    return JsonResponse(
        {
            'description': 'Lorem Ipsum - dummy description',
            'maze': [
                [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            ]
        }
    )
