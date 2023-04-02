from django.urls import path

from .views import CategoryList, ProductSearachView, CategoryDetail, ProductDetail

urlpatterns = [
    path('', CategoryList.as_view()),
    path('search/', ProductSearachView.as_view()),
    path('<slug:category_slug>/', CategoryDetail.as_view()),
    path('<slug:category_slug>/<slug:product_slug>/', ProductDetail.as_view()),
]
