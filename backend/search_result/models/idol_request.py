from django.db import models


class IdolRequest(models.Model):
    idol_name = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    handled = models.BooleanField(default=False)

    class Meta:
        ordering = ["created_at"]