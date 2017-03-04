import subprocess
from django.http import JsonResponse
from os import path

STATIC_FOLDER = 'static/'
SRC_EXT = '.cpp'
DESCRIPTION_EXT = '.description'
CC = 'g++'
CFLAG = '-Wall'


def get_file_full_path(filename: str):
    """
    :param filename: Name of the file
    :type filename: str
    :return: Full path and name to file on server
    :rtype: str
    """
    return STATIC_FOLDER + filename + SRC_EXT


def get_exec_full_path(filename: str):
    """
    :param filename: Name of the file
    :type filename: str
    :return: Full path and name to executable on server
    :rtype: str
    """
    return STATIC_FOLDER + filename


def write_file(filename: str, content: str):
    """
    :param filename: Name of the file
    :type filename: str
    :param content: Content that will be written in the file
    :type content: str
    """
    file = open(get_file_full_path(filename), 'w')
    file.write(content)
    file.close()


def compile_file(filename: str):
    """
    :param filename: Name of the file
    :type filename: str
    :return:
    :rtype: bytearray, bytearray
    """
    compile_process = subprocess.Popen(
        [CC, get_file_full_path(filename), CFLAG, '-o', get_exec_full_path(filename)],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    return compile_process.communicate()


def run_exec(filename: str):
    """
    :param filename: Name of the file
    :type filename: str
    :return:
    :rtype: bytearray, bytearray
    """
    run_process = subprocess.Popen(
        [get_exec_full_path(filename)],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    return run_process.communicate()


def clean(filename: str):
    """
    Delete compiled files from static folder
    :param filename: Name of the file
    :type filename: str
    """
    subprocess.Popen(['rm', '-rf', get_file_full_path(filename), get_exec_full_path(filename)])


def set_response_headers(json_response: JsonResponse):
    """
    Set Content-Type and Access-Control-Allow-Origin headers to Response
    :param json_response: The JsonResponse to which it will set headers
    :type json_response: JsonResponse
    """
    json_response.__setitem__("Content-type", "application/json")
    json_response.__setitem__("Access-Control-Allow-Origin", "*")


def get_tutorial_file_name_path(tutorial_name: str, level: str, extension: str):
    """
    Get the path from the static folder
    :param tutorial_name: Name of the tutorial
    :type tutorial_name: str
    :param level: Level of the tutorial
    :type level: int
    :param extension: Extension of the file
    :type extension: str
    :rtype: str
    """
    return STATIC_FOLDER + tutorial_name + '/' + tutorial_name + level + extension


def check_tutorial_existence(tutorial_name: str, level: str):
    """
    Check the tutorial existence
    :param tutorial_name: Name of the tutorial
    :type tutorial_name: str
    :param level: Level of the tutorial
    :type level: str
    :rtype: bool
        """
    return path.isfile(get_tutorial_file_name_path(tutorial_name, level, DESCRIPTION_EXT))


def get_description(tutorial_name: str, level: str):
    """
    Get the description for a certain tutorial at a certain level
    :param tutorial_name: Name of the tutorial
    :type tutorial_name: str
    :param level: Level of the tutorial
    :type level: str
    :return description: Description of the tutorial
    :rtype description: str
    """
    filename = get_tutorial_file_name_path(tutorial_name, level, DESCRIPTION_EXT)
    file = open(filename, 'r')
    description = file.read()
    file.close()

    return description


def get_framework(tutorial_name: str, level: str):
    """
    Get the framework for a certain tutorial at a certain level
    :param tutorial_name: Name of the tutorial
    :type tutorial_name: str
    :param level: Level of the tutorial
    :type level: str
    :return framework: Framework of the tutorial
    :rtype framework: str
    """
    filename = get_tutorial_file_name_path(tutorial_name, level, SRC_EXT)
    file = open(filename, 'r')
    framework = file.read()
    file.close()

    return framework
