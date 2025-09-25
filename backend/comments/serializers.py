from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'author_name', 'author_email', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']