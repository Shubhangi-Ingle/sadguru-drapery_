from sqlalchemy import Column, Integer, String, ForeignKey, Text, Float, Date, Table, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

product_relations = Table(
    "product_relations",
    Base.metadata,
    Column("product_id", Integer, ForeignKey("products.id"), primary_key=True),
    Column("related_product_id", Integer, ForeignKey("products.id"), primary_key=True),
)

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    cover_image_url = Column(String, nullable=True)

    subcategories = relationship("Subcategory", back_populates="category")

class Subcategory(Base):
    __tablename__ = "subcategories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    cover_image_url = Column(String, nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"))

    category = relationship("Category", back_populates="subcategories")
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    rent_price = Column(Float, nullable=True)
    original_price = Column(Float, nullable=True)
    status = Column(String, default="available")
    available_from = Column(Date, nullable=True)

    category_id = Column(Integer, ForeignKey("categories.id"))
    subcategory_id = Column(Integer, ForeignKey("subcategories.id"), nullable=True)

    category = relationship("Category")
    subcategory = relationship("Subcategory")

    related_products = relationship(
        "Product",
        secondary=product_relations,
        primaryjoin=id == product_relations.c.product_id,
        secondaryjoin=id == product_relations.c.related_product_id,
    )

class ProductImage(Base):
    __tablename__ = "product_images"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    is_cover = Column(Integer, default=0)   # 1 = cover photo, 0 = regular
    product_id = Column(Integer, ForeignKey("products.id"))

    product = relationship("Product", backref="images")

class SizeChart(Base):
    __tablename__ = "size_charts"

    id = Column(Integer, primary_key=True, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"))
    chart_image_url = Column(String, nullable=True)   # image of the size chart
    chart_text = Column(Text, nullable=True)           # optional: text-based measurements table

    category = relationship("Category", backref="size_chart")


class ProductSize(Base):
    __tablename__ = "product_sizes"

    id = Column(Integer, primary_key=True, index=True)
    size_label = Column(String, nullable=False)
    is_available = Column(Integer, default=1)
    restock_date = Column(Date, nullable=True)
    product_id = Column(Integer, ForeignKey("products.id"))

    product = relationship("Product", backref="sizes")
class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    is_approved = Column(Integer, default=0)
    product_id = Column(Integer, ForeignKey("products.id"))

    product = relationship("Product", backref="reviews")
class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    from datetime import datetime

class Design(Base):
    __tablename__ = "designs"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    caption = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)