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

from .serializers import ItemSerializer

from .models import Item

# Create your views here.

@api_view(["POST"])
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
def logout(request):
    username = request.data.get("username")
    password = request.data.get("password")
    
    if not username or not password:
        return Response({"error": "Username and password are required."}, status=400)
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        Token.objects.filter(user=user).delete()  # Delete the token to log out
        return Response({"msg": "Logout successful."}, status=200)
    else:
        return Response({"error": "Invalid credentials."}, status=401)
    


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_item(request):
    serializer = ItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response({"msg": "Item created successfully." ,'data': serializer.data}, status=201)
    
    return Response({"error": "Invalid data.", "details": serializer.errors}, status=400)
    

@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_items(request):
    items = Item.objects.filter()
    serializer = ItemSerializer(items, many=True)
    return Response({"msg": "Items retrieved successfully.", "data": serializer.data}, status=200)



class ItemViewClass(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request,item_id):
        item= Item.objects.get(id=item_id)
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Item updated successfully." ,'data': serializer.data}, status=200)
        return Response({"error": "Invalid data.", "details": serializer.errors}, status=400)

    def get(self, request,item_id):
        item = Item.objects.get(id=item_id)
        serializer = ItemSerializer(item)
        return Response({"msg": "Item retrieved successfully.", "data": serializer.data}, status=200)
    
    def delete(self, request,item_id):
        item = Item.objects.get(id=item_id)
        item.delete()
        return Response({"msg": "Item deleted successfully."}, status=200)
    

# //////////////////////////////////////////////////

from django_filters.rest_framework import DjangoFilterBackend
from .serializers import OrderSerializer
from .models import Order
class ItemModelviewset(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name', 'price', 'quantity']
    
    
class OrderModelviewset(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['order_status', 'created_at', 'shipped_date', 'delivered_date', 'cancelled_date']