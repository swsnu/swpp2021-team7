from django.contrib.auth.decorators import login_required
from django.db.models.expressions import F
from django.views.decorators.http import require_http_methods
from django.core.paginator import Paginator
from django.db.models import Count
from .models import SearchLog

LOGIN_PATH = "/"
DEFAULT_PAGE_SIZE = 10


@login_required(login_url=LOGIN_PATH)
@require_http_methods(["GET"])
def rankingInfoGet(request):
    page = request.GET.get('page', 0)
    size = request.GET.get('size', DEFAULT_PAGE_SIZE)
    
    startIndex = page * size
    lastIndex = (page + 1) * size
    lastPage = 0
    searchLogs = SearchLog.objects.all().values('query').annotate(
        total=Count('query'),
        isMember=F('isMember')
        ).order_by('total')
    
    totalResultLen = len(searchLogs)
    if lastIndex > totalResultLen:
        lastIndex = totalResultLen
        
    lastPage = (totalResultLen % size) + 1
    
    searchLogs = searchLogs[startIndex:lastIndex]
    
    for srchLog in searchLogs:
        model = None
    
    
    pass
# Create your views here.
