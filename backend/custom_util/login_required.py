from functools import wraps

from django.http.response import HttpResponseForbidden


def login_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return func(request, *args, **kwargs)
        return HttpResponseForbidden()

    return wrapper
