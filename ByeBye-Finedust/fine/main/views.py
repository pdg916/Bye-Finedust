from django.shortcuts import render
import gps, os, time

def index(request):
    return render(request,'main/index.html')