from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField()

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f"/{self.slug}/"


class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    slug = models.SlugField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    discount = models.DecimalField(default=0, max_digits=6, decimal_places=2)
    thumbnail = models.ImageField(upload_to="assets/products/", blank=True, null=True)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return f'/{self.category.slug}/{self.slug}/' 
