from django.shortcuts import render, redirect

# Create your views here.

def main(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        return redirect('login-page')


def login(request):
    return render(request, 'dashboard/index.html')


def dashboard(request):
    if 'userToken' in request.COOKIES:
        return render(request, 'dashboard/index.html')
    else:
        return redirect('login-page')