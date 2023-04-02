from rest_framework import generics, mixins, filters
from rest_framework.response import Response

from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer, CategoryListSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryListSerializer

class CategoryDetail(mixins.ListModelMixin, 
                     mixins.CreateModelMixin, 
                     generics.GenericAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        category_slug = self.kwargs.get("category_slug")
        return Product.objects.filter(category__slug=category_slug)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data["category"] = Category.objects.get(slug=self.kwargs.get("category_slug"))
        serializer = ProductSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request, *args, **kwargs):
        category = Category.objects.get(slug=self.kwargs.get("category_slug"))
        category.name = request.data.get("name", category.name)
        category.slug = request.data.get("slug", category.slug)
        category.save()
        return Response(CategorySerializer(category).data) 

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "slug"
    lookup_url_kwarg = "product_slug"
    
class ProductSearachView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']
    