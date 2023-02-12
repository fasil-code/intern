import functools
from flask import jsonify
from make_response.reponse_formatter_execptions import (
    DataValidationException,
    DataDuplicationException,
    DataMissingException,
    CommonException)


def exceptions_handler(error) -> (dict, bool, int, str):
    """
        Handling exceptions related to response
    """
    return {}, False, error.status_code, str(error)


def response_format(_func=None, allow_exception=False):
    def formatter(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            data, success, status, message = exception_handling(
                func,
                allow_exception,
                *args,
                **kwargs)
            response = {
                "data": data,
                "success": success,
                "status": status,
                "message": message
            }
            return jsonify(response)

        return wrapper

    return formatter


def exception_handling(func, allow_exception, *args, **kwargs):
    if allow_exception:
        return func(*args, **kwargs)

    try:
        _data = func(*args, **kwargs)
    except DataValidationException as error:
        _data = exceptions_handler(error)
    except DataDuplicationException as error:
        _data = exceptions_handler(error)
    except DataMissingException as error:
        _data = exceptions_handler(error)
    except Exception as error:
        error = CommonException(str(error))
        _data = exceptions_handler(error)
    return _data
