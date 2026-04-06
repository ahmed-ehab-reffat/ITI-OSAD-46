from rest_framework import viewsets, filters, views
from rest_framework.response import Response
from django.db.models import Sum, Count
from .models import Grade
from .serializers import GradeSerializer
from students.models import Student
from subjects.models import Subject

class GradeViewSet(viewsets.ModelViewSet):
    queryset = Grade.objects.select_related('student', 'subject').all()
    serializer_class = GradeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['student__name', 'student__id', 'subject__name', 'subject__code']

class LeaderboardAPIView(views.APIView):
    def get(self, request):
        top_students = (
            Student.objects
            .annotate(
                total_score=Sum('grades__score'),
                subject_count=Count('grades__subject', distinct=True),
            )
            .filter(total_score__isnull=False)
            .order_by('-total_score')[:5]
        )

        data = []
        for rank, student in enumerate(top_students, start=1):
            subjects = (
                Subject.objects
                .filter(grades__student=student)
                .annotate(student_score=Sum('grades__score'))
                .order_by('name')
            )
            data.append({
                'rank': rank,
                'student': {
                    'id': student.id,
                    'name': student.name
                },
                'subjects': [
                    {'id': sub.id, 'name': sub.name, 'score': sub.student_score} for sub in subjects
                ],
                'total_score': student.total_score or 0,
            })

        return Response(data)
