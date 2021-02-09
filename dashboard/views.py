from django.shortcuts import render, redirect


def main(request):
    if 'userToken' in request.COOKIES:
        return redirect('dashboard')
    else:
        return redirect('login-page')


def login(request):
    if 'userToken' in request.COOKIES:
        return redirect('dashboard')
    else:
        return render(request, 'dashboard/index.html')


def dashboard(request):
    if 'userToken' in request.COOKIES:
        return render(request, 'dashboard/index.html')
    else:
        return redirect('login-page')