from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

import braintree
gateway = braintree.BraintreeGateway(
  braintree.Configuration(
    environment=braintree.Environment.Sandbox,
    merchant_id='2w648vwvxqwsg586',
    public_key='4r4dmqm6zzch633r',
    private_key='8d5819a56aafc65d4d8ade01e8b15a8a'
  )
)


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
def generate_token(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error' : 'Invalid Login Session'})
    return JsonResponse({'client':gateway.client_token.generate(),'success':True})

@csrf_exempt
def process_payment(request,id,token):
    if not validate_user_session(id,token):
        return JsonResponse({'error' : 'Invalid Login Session'})
    nonce_from_the_client = request.POST["paymentMethodNonce"]
    amount_fromt_the_client = request.POST["amount"]
    result = gateway.transaction.sale({
        "amount":amount_fromt_the_client,
        "payment_method_nonce": nonce_from_the_client,
        "options": {
            "submit_for_settlement": True
        }
    })

    if result.is_success:
        return JsonResponse({
            "sucess":result.is_success,
            "transaction":{"id":result.transaction.id,
                           "amount":result.transaction.amount},
            })
    else:
        return JsonResponse({"error":True,"success":False})
