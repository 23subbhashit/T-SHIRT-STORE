from django.shortcuts import render

#import JsonResponse
from django.http import JsonResponse
# Create your views here.

def home(request):
    return  JsonResponse({'info' : 'Django React Course' , 'name' : 'Subbhashit Mukherjee'})