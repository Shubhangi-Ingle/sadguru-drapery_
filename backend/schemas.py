from pydantic import BaseModel
from typing import List, Optional
from datetime import date
from datetime import datetime as dt

class SubcategoryOut(BaseModel):
    id: int
    name: str
    cover_image_url: Optional[str] = None
    category_id: int

    class Config:
        from_attributes = True

class CategoryCreate(BaseModel):
    name: str

class CategoryUpdate(BaseModel):
    name: Optional[str] = None

class CategoryOut(BaseModel):
    id: int
    name: str
    cover_image_url: Optional[str] = None
    subcategories: List[SubcategoryOut] = []

    class Config:
        from_attributes = True

class SubcategoryCreate(BaseModel):
    name: str
    category_id: int

class SubcategoryUpdate(BaseModel):
    name: Optional[str] = None

class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    rent_price: Optional[float] = None
    original_price: Optional[float] = None
    status: str = "available"
    available_from: Optional[date] = None
    category_id: int
    subcategory_id: Optional[int] = None

class ProductImageOut(BaseModel):
    id: int
    image_url: str
    is_cover: int

    class Config:
        from_attributes = True


class SizeChartCreate(BaseModel):
    category_id: Optional[int] = None
    chart_text: Optional[str] = None


class SizeChartOut(BaseModel):
    id: int
    category_id: Optional[int] = None
    chart_image_url: Optional[str] = None
    chart_text: Optional[str] = None

    class Config:
        from_attributes = True


class ProductSizeCreate(BaseModel):
    size_label: str
    is_available: bool = True
    restock_date: Optional[date] = None
    product_id: int


class ProductSizeOut(BaseModel):
    id: int
    size_label: str
    is_available: int
    restock_date: Optional[date] = None

    class Config:
        from_attributes = True
        
class RelatedProductOut(BaseModel):
    id: int
    name: str
    rent_price: Optional[float] = None
    images: List[ProductImageOut] = []

    class Config:
        from_attributes = True


class LinkRelatedProduct(BaseModel):
    product_id: int
    related_product_id: int

class ProductOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    rent_price: Optional[float] = None
    original_price: Optional[float] = None
    status: str
    available_from: Optional[date] = None
    category_id: int
    subcategory_id: Optional[int] = None
    images: List[ProductImageOut] = []
    sizes: List[ProductSizeOut] = []
    related_products: List[RelatedProductOut] = []

    class Config:
        from_attributes = True

class ReviewCreate(BaseModel):
    customer_name: str
    rating: int
    comment: Optional[str] = None
    product_id: int


class ReviewOut(BaseModel):
    id: int
    customer_name: str
    rating: int
    comment: Optional[str] = None
    image_url: Optional[str] = None
    is_approved: int
    product_id: int

    class Config:
        from_attributes = True

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    rent_price: Optional[float] = None
    original_price: Optional[float] = None
    status: Optional[str] = None
    available_from: Optional[date] = None
    category_id: Optional[int] = None
    subcategory_id: Optional[int] = None

class SizeChartUpdate(BaseModel):
    chart_text: Optional[str] = None


class DesignOut(BaseModel):
    id: int
    image_url: str
    caption: Optional[str] = None
    created_at: dt

    class Config:
        from_attributes = True

class DesignUpdate(BaseModel):
    caption: Optional[str] = None