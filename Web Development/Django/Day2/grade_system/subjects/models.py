from django.db import models

class Subject(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField(blank=True)
    teacher = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"{self.code} - {self.name}"
