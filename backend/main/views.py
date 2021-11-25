from django.db.models.expressions import F
from django.http.response import HttpResponseNotFound, JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
from django.db.models import Count
from search_result.models import IdolGroup, IdolMember
from .models import SearchLog
from django.contrib.auth.decorators import login_required


LOGIN_PATH = "/"
DEFAULT_PAGE_SIZE = 10


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET"])
def ranking_info_get(request):
    page = int(request.GET.get("page", 1)) - 1  # page는 1부터 시작한다
    size = int(request.GET.get("size", DEFAULT_PAGE_SIZE))

    startIndex = page * size
    lastIndex = (page + 1) * size
    lastPage = 0
    total_result_len = (
        SearchLog.objects.all().values("query").annotate(total=Count("query")).count()
    )
    searchLogs = (
        SearchLog.objects.all()
        .values("query")
        .annotate(total=Count("query"), isMember=F("isMember"))
        .order_by("-total")
    )

    lastIndex = min(lastIndex, total_result_len)

    last_page = min(
        int((total_result_len / size)) + (0 if total_result_len % size == 0 else 1),
        (int((page / size)) + 1) * 10,
    )

    searchLogs = searchLogs[startIndex:lastIndex]

    indolInfos = []
    for srchLog in searchLogs:
        model = None
        if srchLog["isMember"]:
            model = IdolMember
        else:
            model = IdolGroup

        idol_info = model.objects.filter(
            name__kor=srchLog["query"]
        ) | model.objects.filter(name__eng=srchLog["query"])
        if not idol_info.exists():
            return HttpResponseNotFound()

        indolInfos.append(idol_info.values().first())

    return JsonResponse({"lastPage": last_page, "idolInfos": indolInfos})


# Create your views here.
