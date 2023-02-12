class CommonException(Exception):
    status_code = 404
    phrase = 'Common error'


class DataValidationException(CommonException):
    status_code = 700
    phrase = 'Data Validation Error'


class DataDuplicationException(CommonException):
    status_code = 462
    phrase = 'Data Duplication Error'


class DataMissingException(CommonException):
    status_code = 420
    phrase = 'Data Missing Error'
