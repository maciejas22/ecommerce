from django.urls import path

from .views import CategoryList, CategoryDetail, ProductDetail

urlpatterns = [
    path('', CategoryList.as_view()),
    path('<slug:category_slug>/', CategoryDetail.as_view()),
    path('<slug:category_slug>/<slug:product_slug>/', ProductDetail.as_view()),
]
