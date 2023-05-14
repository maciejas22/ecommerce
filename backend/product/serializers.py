from rest_framework import serializers

from .models import Product, Category


class ProductSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "thumbnail",
            "category",
            "name",
            "price",
            "discount",
            "slug",
            "date_added",
            "get_absolute_url",
        )

    def get_thumbnail(self, obj):
        return obj.thumbnail.url if obj.thumbnail else None


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = Category
        fields = ("name", "slug", "products", "get_absolute_url")


class CategoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug", "get_absolute_url")
