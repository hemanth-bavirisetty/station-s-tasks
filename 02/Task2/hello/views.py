from django.shortcuts import render

def index(request):
    """
    View function to render the 'hello/index.html' template.
    """
    return render(request, 'hello/index.html', {'message': 'Hello, World!'})
