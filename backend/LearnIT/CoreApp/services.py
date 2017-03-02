import string, subprocess

STATIC_FOLDER = 'static/'
EXT = '.c'
CC = 'gcc'
CFLAG = '-Wall'


def get_file_full_path(filename: string):
    """
    :param filename: Name of the file
    :type filename: string
    :return: Full path and name to file on server
    :rtype: string
    """
    return STATIC_FOLDER + filename + EXT


def get_exec_full_path(filename: string):
    """
    :param filename: Name of the file
    :type filename: string
    :return: Full path and name to executable on server
    :rtype: string
    """
    return STATIC_FOLDER + filename


def write_file(filename: string, content: string):
    """
    :param filename: Name of the file
    :type filename: string
    :param content: Content that will be written in the file
    :type content: string
    """
    file = open(get_file_full_path(filename), 'w')
    file.write(content)
    file.close()


def compile_file(filename: string):
    """
    :param filename: Name of the file
    :type filename: string
    :return:
    :rtype: bytearray, bytearray
    """
    compile_process = subprocess.Popen(
        [CC, get_file_full_path(filename), CFLAG, '-o', get_exec_full_path(filename)],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    return compile_process.communicate()


def run_exec(filename: string):
    """
    :param filename: Name of the file
    :type filename: string
    :return:
    :rtype: bytearray, bytearray
    """
    run_process = subprocess.Popen(
        [get_exec_full_path(filename)],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    return run_process.communicate()


def clean(filename: string):
    """
    :param filename: Name of the file
    :type filename: string
    """
    subprocess.Popen(['rm', '-rf', get_file_full_path(filename), get_exec_full_path(filename)])
