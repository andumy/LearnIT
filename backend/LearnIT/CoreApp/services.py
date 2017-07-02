import subprocess
import json
import fileinput
from django.http import JsonResponse
from os import path
from shutil import copyfile

STATIC_FOLDER = 'static/'
SRC_EXT = '.cpp'
DESCRIPTION_EXT = 'description'
SCH_EXT = 'snp'
INPUT_EXT = 'in'
CC = 'g++'
CFLAG = '-Wall'
PLACEHOLDER = '%@PLACEHOLDER@%'


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
    :rtype: bytearray, bytearray, bytearray
    """
    run_process = subprocess.Popen(
        [get_exec_full_path(filename)],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )

    return run_process.communicate(), run_process.returncode


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
    json_response.__setitem__("Access-Control-Allow-Origin", "http://82.118.226.25:8000")
    json_response.__setitem__("Access-Control-Allow-Headers", "sessionId")


def get_tutorial_file_name_path(tutorial_name: str, language: str, level: str, extension: str):
    """
    Get the path from the static folder
    :param tutorial_name: Name of the tutorial
    :type tutorial_name: str
    :param language: Programming language extension of the file
    :type language: str
    :param level: Level of the tutorial
    :type level: int
    :param extension: Extension of the file
    :type extension: str
    :rtype: str
    """
    return STATIC_FOLDER + tutorial_name + '/' + tutorial_name + level + '.' + language + '.' + extension


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


def get_description(tutorial_name: str, language: str, level: str):
    """
    Get the description for a certain tutorial at a certain level
    :param tutorial_name: Name of the tutorial
    :type tutorial_name: str
    :param language: Programming language of the tutorial
    :type language: str
    :param level: Level of the tutorial
    :type level: str
    :return description: Description of the tutorial
    :rtype description: str
    """
    filename = get_tutorial_file_name_path(tutorial_name, language, level, DESCRIPTION_EXT)
    file = open(filename, 'r')
    description = file.read()
    file.close()

    return description


def get_code_snippet(tutorial_name: str, language: str, level: str):
    """
    Get the framework for a certain tutorial at a certain level
    :param tutorial_name: Name of the tutorial
    :type tutorial_name: str
    :param language: Programming language of the tutorial
    :type language: str
    :param level: Level of the tutorial
    :type level: str
    :return framework: Framework of the tutorial
    :rtype framework: str
    """
    filename = get_tutorial_file_name_path(tutorial_name, language, level, SCH_EXT)
    if path.isfile(filename) is False:
        return ''
    file = open(filename, 'r')
    framework = file.read()
    file.close()

    return framework


def get_input(tutorial_name: str, language: str, level: str):
    """
    Get the input for a certain tutorial at a certain level
    :param tutorial_name: Name of the tutorial
    :type tutorial_name: str
    :param language: Programming language of the tutorial
    :type language: str
    :param level: Level of the tutorial
    :type level: str
    :return input_dict: Input of the tutorial
    :rtype input_dict: dict
    """
    filename = get_tutorial_file_name_path(tutorial_name, language, level, INPUT_EXT)
    if path.isfile(filename) is False:
        return {}
    file = open(filename, 'r')
    raw_text = file.read()
    input_dict = json.loads(raw_text)
    file.close()

    return input_dict


def replace_placeholder(tutorial_name: str, level: str, content: str):
    src_filename = get_tutorial_file_name_path(tutorial_name, level, SRC_EXT)
    dst_filename = get_file_full_path(tutorial_name + level)
    copyfile(src_filename, dst_filename)

    with fileinput.FileInput(dst_filename, inplace=True, backup='.bak') as file_it:
        for line in file_it:
            print(line.replace(PLACEHOLDER, content), end='')
