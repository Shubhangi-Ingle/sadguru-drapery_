from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
import cloudinary.uploader
import cloudinary_config 
import auth
router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", response_model=schemas.ProductOut)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    category = db.query(models.Category).filter(models.Category.id == product.category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    new_product = models.Product(**product.dict())
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product


@router.get("/", response_model=list[schemas.ProductOut])
def list_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()


@router.get("/{product_id}", response_model=schemas.ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/{product_id}/upload-image")
def upload_product_image(product_id: int, file: UploadFile = File(...), is_cover: bool = False, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    result = cloudinary.uploader.upload(file.file)
    image_url = result["secure_url"]

    new_image = models.ProductImage(
        image_url=image_url,
        is_cover=1 if is_cover else 0,
        product_id=product_id
    )
    db.add(new_image)
    db.commit()
    db.refresh(new_image)
    return new_image

@router.post("/link-related")
def link_related_product(link: schemas.LinkRelatedProduct, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    product = db.query(models.Product).filter(models.Product.id == link.product_id).first()
    related = db.query(models.Product).filter(models.Product.id == link.related_product_id).first()

    if not product or not related:
        raise HTTPException(status_code=404, detail="One or both products not found")

    if related not in product.related_products:
        product.related_products.append(related)
        product.related_products  # trigger relationship
    # make it two-way, so it shows on both product pages
    if product not in related.related_products:
        related.related_products.append(product)

    db.commit()
    return {"message": f"Linked '{product.name}' with '{related.name}'"}

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()
    return {"message": f"Product '{product.name}' deleted"}

@router.patch("/{product_id}", response_model=schemas.ProductOut)
def update_product(product_id: int, update: schemas.ProductUpdate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product

@router.delete("/images/{image_id}")
def delete_product_image(image_id: int, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    image = db.query(models.ProductImage).filter(models.ProductImage.id == image_id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    db.delete(image)
    db.commit()
    return {"message": "Image deleted"}


@router.patch("/images/{image_id}/set-cover")
def set_cover_image(image_id: int, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    image = db.query(models.ProductImage).filter(models.ProductImage.id == image_id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    # unset any other cover image on this product
    db.query(models.ProductImage).filter(
        models.ProductImage.product_id == image.product_id,
        models.ProductImage.id != image_id
    ).update({"is_cover": 0})

    image.is_cover = 1
    db.commit()
    return {"message": "Cover image updated"}