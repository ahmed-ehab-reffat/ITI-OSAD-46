from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Subject
from .serializers import SubjectSerializer
from grades.serializers import GradeSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    @action(detail=True, methods=['get'])
    def grades(self, request, pk=None):
        subject = self.get_object()
        grades = subject.grades.select_related('student').order_by('-score')
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)
