from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model,login,logout
from django.views.decorators.csrf import csrf_exempt
# Create your views here.
import random
import re

def generate_session_token(length=10):
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97,123)]+[str(i) for i in range(10)])for _ in range(length))

@csrf_exempt
def signin(request):

    if not request.method == 'POST':
        return JsonResponse({'error' : 'Send a post rquest with valid parameters only'})
    

    username = request.POST['email']
    password = request.POST['password']

    # Validation part
    if not re.match("([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+",username):
        return JsonResponse({'error' : 'Enter a valid email'})
    if len(password) < 3 :
        return JsonResponse({'error' : 'Password needs to be atleast of 3 char'})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)
        #inbuilt method for password checking
        if user.check_password(password):
            usr_dict = UserModel.objects.filter(email = username).values().first()
            usr_dict.pop('password')
            # assign  0 if session already exist , so next time 
            # a new session will be created when user tries to log in
            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({'error':'Preious session exists'})
            
            token = generate_session_token()
            user.session_token = token
            user.save()
            login(request,user)
            return JsonResponse({'token':token,'user' : usr_dict})
        else:
            return JsonResponse({'error':'invalid password'})
        
    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Invalid email'})
    
def signout(request,id):
    logout(request)
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk = id)
        user.session_token = "0"
        user.save()

    except UserModel.DoesNotExist :
        return JsonResponse({'error' : 'Invalid User Id'})
    

    return JsonResponse({'success':'Logout Success'})

class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = { 'create' : [ AllowAny ] }
    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            return [permission() for permission in self.permission_classes]