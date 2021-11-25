from django.db.models.expressions import F
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from django.db.models import Count
from search_result.models import IdolGroup, IdolMember
from .models import SearchLog


LOGIN_PATH = "/"
DEFAULT_PAGE_SIZE = 10


# @login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET"])
def rankingInfoGet(request):
    page = int(request.GET.get("page", 0))
    size = int(request.GET.get("size", DEFAULT_PAGE_SIZE))

    startIndex = page * size
    lastIndex = (page + 1) * size
    lastPage = 0
    searchLogs = (
        SearchLog.objects.all()
        .values("query")
        .annotate(total=Count("query"), isMember=F("isMember"))
        .order_by("-total")
    )

    totalResultLen = len(searchLogs)
    lastIndex = min(lastIndex, totalResultLen)

    lastPage = int((totalResultLen / size)) + 1

    searchLogs = searchLogs[startIndex:lastIndex]

    indolInfos = []
    for srchLog in searchLogs:
        model = None
        if srchLog["isMember"]:
            model = IdolMember
        else:
            model = IdolGroup

        idolInfo = get_object_or_404(model, name=srchLog["query"])
        indolInfos.append(idolInfo)

    return JsonResponse(
        {
            "lastPage": lastPage,
            # "idolInfos" : indolInfos
        }
    )


# Create your views here.
