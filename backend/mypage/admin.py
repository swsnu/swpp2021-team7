from django.contrib import admin
from mypage.models import (
    ArticleGroupScrap,
    ArticleMemberScrap,
    MyIdolMember,
    MyIdolGroup,
)

admin.site.register(ArticleGroupScrap)
admin.site.register(ArticleMemberScrap)
admin.site.register(MyIdolMember)
admin.site.register(MyIdolGroup)

# Register your models here.
