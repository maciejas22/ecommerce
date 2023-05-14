from product.models import Product
from rest_framework import serializers

from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ('id', 'product', 'quantity')

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['product_id'] = Product.objects.get(id=instance.product.id).id
        rep['product'] = Product.objects.get(id=instance.product.id).name
        rep['product_price'] = Product.objects.get(id=instance.product.id).price
        rep['product_discount'] = Product.objects.get(id=instance.product.id).discount
        rep['product_thumbnail'] = Product.objects.get(id=instance.product.id).thumbnail.url if Product.objects.get(
            id=instance.product.id).thumbnail else None
        return rep

    def create(self, validated_data):
        product_data = validated_data.pop('product')
        product = Product.objects.get(id=product_data['id'])
        cart_item = CartItem.objects.create(product=product, **validated_data)
        return cart_item


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)

    class Meta:
        model = Cart
        fields = ('id', 'items', 'created',)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['items'] = CartItemSerializer(instance.items.all(), many=True).data
        rep['status'] = instance.get_status_display()
        return rep

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        cart = Cart.objects.create(**validated_data)
        for item_data in items_data:
            CartItem.objects.create(cart=cart, **item_data)
        return cart
