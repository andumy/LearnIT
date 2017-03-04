from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^run$', views.run, name='run'),
    url(r'^level$', views.level, name='level'),
    url(r'^init/(?P<tutorial>[0-9a-zA-Z]+)/(?P<level>[0-9]+)$', views.tutorial_init, name='tutorial_init'),
    url(r'^$', views.index, name='index'),
]