from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from .models import Order
from django.views.decorators.csrf import csrf_exempt

def validate_user_session(id,token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

@csrf_exempt
def add(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error' : 'Please Re-Login','code':'1'})
    if request.method == "POST":
        user_id = id
        transaction_id = request.POST["transaction_id"]
        amount = request.POST["amount"]
        products = request.POST["products"]

        total_products = len(products.split(',')[:-1])
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({"error":"User Does Not Exist"})
        
        order = Order(user=user,product_names=products,total_products=total_products,transaction_id=transaction_id,total_amount=amount)
        order.save()
        return JsonResponse({"Success":True,"error":False,"msg" : "Order Placed Successfully"})

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer