from product.models import Product
from rest_framework import generics, mixins, status
from rest_framework.response import Response

from .models import Cart
from .serializers import CartSerializer


class CartList(generics.ListCreateAPIView):
    serializer_class = CartSerializer

    def get_queryset(self):
        queryset = Cart.objects.filter(user=self.request.user)
        if queryset.exists():
            first_item = queryset.first()
            if first_item.status == 'UNSUBMITTED':
                return queryset[1:]
        return queryset

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CartDetail(mixins.RetrieveModelMixin,
                 mixins.CreateModelMixin,
                 generics.GenericAPIView):
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        if queryset.exists():
            return queryset.first()
        return None

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = CartSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance is None or instance.status != 'UNSUBMITTED':
            instance = Cart.objects.create(user=self.request.user)

        product = Product.objects.get(id=request.data['id'])
        if product is None:
            return Response(data={'message': 'Product not found.'}, status=404)
        if product.id in [item.product_id for item in instance.items.all()]:
            for item in instance.items.all():
                if item.product_id == product.id:
                    item.quantity += 1
                    item.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)

        instance.items.create(product=product)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CartModifyView(mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     generics.GenericAPIView):
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        if queryset.exists():
            return queryset.first()
        return None

    def put(self, request, *args, **kwargs):
        instance = self.get_object()
        if 'item_id' in kwargs:
            for item in instance.items.all():
                if item.product_id == kwargs['item_id']:
                    item.quantity = request.data['quantity']
                    item.save()
        if 'status' in request.data:
            instance.status = request.data['status']

        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        deleted = 0
        for item in instance.items.all():
            if item.product_id == kwargs['item_id']:
                item.delete()
                deleted += 1
        if deleted == 0:
            return Response(data={'message': 'Item not found in cart.'}, status=404)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
