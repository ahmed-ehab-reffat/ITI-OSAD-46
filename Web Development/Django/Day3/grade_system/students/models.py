from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField()
    enrolled_date = models.DateField(auto_now_add=True)
    photo = models.ImageField(upload_to='students/', blank=True, null=True)

    def __str__(self):
        return self.name
