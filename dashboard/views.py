from django.shortcuts import render, redirect

# Create your views here.

def main(request):
    return render(request, 'dashboard/index.html', {'is_login': request.user.is_authenticated})

