from fastapi import APIRouter, Depends, HTTPException,UploadFile, File
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
import auth
import cloudinary.uploader
import cloudinary_config

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("/", response_model=schemas.CategoryOut)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    existing = db.query(models.Category).filter(models.Category.name == category.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")

    new_category = models.Category(name=category.name)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


@router.get("/", response_model=list[schemas.CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()


@router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    db.delete(category)
    db.commit()
    return {"message": f"Category '{category.name}' deleted"}

@router.patch("/{category_id}", response_model=schemas.CategoryOut)
def update_category(category_id: int, update: schemas.CategoryUpdate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    if update.name is not None:
        existing = db.query(models.Category).filter(
            models.Category.name == update.name,
            models.Category.id != category_id
        ).first()
        if existing:
            raise HTTPException(status_code=400, detail="Another category already has this name")
        category.name = update.name

    db.commit()
    db.refresh(category)
    return category

@router.post("/{category_id}/upload-image", response_model=schemas.CategoryOut)
def upload_category_image(category_id: int, file: UploadFile = File(...), db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    result = cloudinary.uploader.upload(file.file)
    category.cover_image_url = result["secure_url"]
    db.commit()
    db.refresh(category)
    return category