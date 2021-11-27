from django.contrib import admin
from .models import (
    IdolGroup,
    IdolMember,
    MemberComment,
    GroupComment,
    IdolMemberInfo,
    IdolGroupInfo,
)

admin.site.register(IdolGroup)
admin.site.register(IdolGroupInfo)
admin.site.register(IdolMember)
admin.site.register(IdolMemberInfo)
admin.site.register(MemberComment)
admin.site.register(GroupComment)


# Register your models here.
