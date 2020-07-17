from io import BytesIO
import pyqrcode
from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return render(request, 'index.html')
