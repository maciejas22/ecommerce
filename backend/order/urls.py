from django.urls import path

from .views import CartList, CartDetail, CartModifyView

urlpatterns = [
    path('list-create-cart/', CartList.as_view()),
    path('get-cart/', CartDetail.as_view()),
    path('update-cart/<uuid:item_id>/', CartModifyView.as_view()),
]
