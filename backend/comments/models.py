from django.db import models


class Comment(models.Model):
    content = models.TextField()
    author_name = models.CharField(max_length=100)
    author_email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Comment by {self.author_name} - {self.content[:50]}..."
