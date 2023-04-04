from django.contrib.auth.models import User
from django.db import models

from ..product.models import Product


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ("-created",)

    def __str__(self):
        return self.id

    def get_total_price(self):
        return sum(item.get_total_price() for item in self.cart_items.all())

    def get_total_quantity(self):
        return sum(item.quantity for item in self.cart_items.all())


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='cart_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, releted_name='items', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.product.name

    def get_total_price(self):
        return self.product.price * self.quantity
