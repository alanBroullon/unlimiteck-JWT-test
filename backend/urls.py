from django.conf.urls.static import static

import backend.views

from django.conf import settings
from django.conf.urls import url, include
from django.views.decorators.csrf import csrf_exempt
from django.contrib import admin
from django.views.static import serve

urlpatterns = [
    url(r'^$', backend.views.index),
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns.append(url(r'^__debug__/', include(debug_toolbar.urls)))
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
