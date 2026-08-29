from fastapi import APIRouter, Depends, HTTPException,UploadFile, File
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
import auth
import cloudinary.uploader
import cloudinary_config

router = APIRouter(prefix="/subcategories", tags=["Subcategories"])

import auth

@router.post("/", response_model=schemas.SubcategoryOut)
def create_subcategory(sub: schemas.SubcategoryCreate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    category = db.query(models.Category).filter(models.Category.id == sub.category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    new_sub = models.Subcategory(name=sub.name, category_id=sub.category_id)
    db.add(new_sub)
    db.commit()
    db.refresh(new_sub)
    return new_sub


@router.get("/", response_model=list[schemas.SubcategoryOut])
def list_subcategories(db: Session = Depends(get_db)):
    return db.query(models.Subcategory).all()


@router.post("/{subcategory_id}/upload-image", response_model=schemas.SubcategoryOut)
def upload_subcategory_image(subcategory_id: int, file: UploadFile = File(...), db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    sub = db.query(models.Subcategory).filter(models.Subcategory.id == subcategory_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subcategory not found")

    result = cloudinary.uploader.upload(file.file)
    sub.cover_image_url = result["secure_url"]
    db.commit()
    db.refresh(sub)
    return sub

@router.patch("/{subcategory_id}", response_model=schemas.SubcategoryOut)
def update_subcategory(subcategory_id: int, update: schemas.SubcategoryUpdate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    sub = db.query(models.Subcategory).filter(models.Subcategory.id == subcategory_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subcategory not found")

    if update.name is not None:
        sub.name = update.name

    db.commit()
    db.refresh(sub)
    return sub


@router.delete("/{subcategory_id}")
def delete_subcategory(subcategory_id: int, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    sub = db.query(models.Subcategory).filter(models.Subcategory.id == subcategory_id).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Subcategory not found")

    db.delete(sub)
    db.commit()
    return {"message": f"Subcategory '{sub.name}' deleted"}