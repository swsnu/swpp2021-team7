from django.contrib import admin
from .models import IdolGroup, IdolMember, MemberComment, GroupComment

admin.site.register(IdolGroup)
admin.site.register(IdolMember)
admin.site.register(MemberComment)
admin.site.register(GroupComment)


# Register your models here.
