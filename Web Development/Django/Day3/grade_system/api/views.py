from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
# auth part
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework import viewsets
# token part 
from rest_framework.authtoken.models import Token

from .serializers import StudentSerializer, SubjectSerializer, GradeSerializer
from students.models import Student
from subjects.models import Subject
from grades.models import Grade

from rest_framework.permissions import IsAuthenticated, AllowAny

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email= request.data.get("email")
    
    if not username or not password or not email:
        return Response({"error": "Username, password and email are required."}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=400)
    user= User.objects.create_user(username=username, password=password, email=email)
    token = Token.objects.create(user=user)
    return Response({"msg": "User registered successfully.", "token": token.key}, status=201)
    

@api_view(["POST"]) 
@permission_classes([AllowAny])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    
    if not username or not password:
        return Response({"error": "Username and password are required."}, status=400)
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        Token.objects.filter(user=user).delete()  # Delete old token if exists
        token = Token.objects.create(user=user)
        return Response({"msg": "Login successful.", "token": token.key}, status=200)
    else:
        return Response({"error": "Invalid credentials."}, status=401)

@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response({"msg": "Logout successful."}, status=200)
    except Exception as e:
        return Response({"error": "No valid token found for user."}, status=400)

from django_filters.rest_framework import DjangoFilterBackend

class StudentModelviewset(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'email']
    
class SubjectModelviewset(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'code', 'teacher']

class GradeModelviewset(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['student', 'subject', 'score']
