from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^run$', views.run, name='run'),
    url(r'^level$', views.level, name='level'),
]