from authentication.models import Profile
from django.db import models
from product.models import Product


class Cart(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    class OrderStatus(models.TextChoices):
        UNSUBMITTED = "UNSUBMITTED", "Unsubmitted"
        PENDING = "PENDING", "Pending"
        COMPLETED = "COMPLETED", "Completed"
        CANCELLED = "CANCELLED", "Cancelled"

    status = models.CharField(max_length=11, choices=OrderStatus.choices, default=OrderStatus.UNSUBMITTED)

    class Meta:
        ordering = ("-created",)

    def __str__(self):
        return f"{self.user.username} - {self.status} - {self.created.strftime('%Y-%m-%d %H:%M:%S')}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.product.name
