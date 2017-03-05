from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from . import services
import json
import time


@csrf_exempt
def index(request: HttpRequest):
    if request.method == 'POST':
        json_body = {'ok': 'POST'}
        json_response = JsonResponse(json_body)
        services.set_response_headers(json_response)
        return json_response

    json_body = {'nok': 'GET'}
    json_response = JsonResponse(json_body)
    services.set_response_headers(json_response)
    return json_response


@csrf_exempt
def run(request: HttpRequest, tutorial: str = '', level: str = ''):
    """
    Run the code and get the result
    :param request: http request for this route
    :type request: HttpRequest
    :param tutorial: Tutorial name (default '')
    :type tutorial: str
    :param level: Level of the tutorial (default '')
    :type level: str
    :return: json response for this route
    :rtype: JsonResponse
    """
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

    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    code = body.get('code')
    if code is None:
        json_response = JsonResponse(
            {
                'internal': True,
                'error': True,
                'output': 'Internal error: The \'code\' key was not found in request'
            }
        )
        services.set_response_headers(json_response)
        return json_response

    if tutorial == '' or level == '':
        filename = 'main'
        services.write_file(filename, code)
    else:
        filename = tutorial + level
        services.replace_placeholder(tutorial, level, code)

    try:
        output_c, error_c = services.compile_file(filename)

        if error_c == b'':
            (output_r, error_r), return_code = services.run_exec(filename)
            if error_r == b'':
                json_body = {
                    'internal': False,
                    'error': False,
                    'output': output_r.decode('utf-8'),
                    'return': return_code
                }
            else:
                json_body = {
                    'internal': False,
                    'error': True,
                    'output': error_r.decode('utf-8')
                }
        else:
            json_body = {
                'internal': False,
                'error': True,
                'output': error_c.decode("utf-8")
            }
    except Exception as e:
        json_body = {
            'internal': True,
            'error': True,
            'Internal exception': e.__traceback__
        }
        pass

    services.clean(filename)
    json_response = JsonResponse(json_body)
    services.set_response_headers(json_response)

    return json_response


def tutorial_init(request: HttpRequest, tutorial: str, level: str):
    if services.check_tutorial_existence(tutorial, level) is False:
        json_body = {
            'error': True,
            'tutorial': tutorial,
            'level': level,
            'info': 'There is no such tutorial'
        }
    else:
        json_body = {
            'error': False,
            'tutorial': tutorial,
            'level': level,
            'description': services.get_description(tutorial, level),
            'framework': services.get_framework(tutorial, level),
            'input': services.get_input(tutorial, level)
        }
    json_response = JsonResponse(json_body)
    services.set_response_headers(json_response)
    return json_response
