from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from sqlalchemy.orm import Session
from typing import Optional
from database import get_db
import models, schemas, auth
import cloudinary.uploader
import cloudinary_config

router = APIRouter(prefix="/designs", tags=["Designs"])

@router.post("/upload", response_model=schemas.DesignOut)
def upload_design(
    file: UploadFile = File(...),
    caption: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    admin: models.AdminUser = Depends(auth.get_current_admin)
):
    result = cloudinary.uploader.upload(file.file)
    new_design = models.Design(image_url=result["secure_url"], caption=caption)
    db.add(new_design)
    db.commit()
    db.refresh(new_design)
    return new_design


@router.get("/", response_model=list[schemas.DesignOut])
def list_designs(
    skip: int = Query(0, ge=0),
    limit: int = Query(24, le=100),
    db: Session = Depends(get_db)
):
    return (
        db.query(models.Design)
        .order_by(models.Design.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


@router.get("/count")
def count_designs(db: Session = Depends(get_db)):
    total = db.query(models.Design).count()
    return {"total": total}


@router.delete("/{design_id}")
def delete_design(design_id: int, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    design = db.query(models.Design).filter(models.Design.id == design_id).first()
    if not design:
        raise HTTPException(status_code=404, detail="Design not found")
    db.delete(design)
    db.commit()
    return {"message": "Design deleted"}

@router.patch("/{design_id}", response_model=schemas.DesignOut)
def update_design(design_id: int, update: schemas.DesignUpdate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    design = db.query(models.Design).filter(models.Design.id == design_id).first()
    if not design:
        raise HTTPException(status_code=404, detail="Design not found")
    design.caption = update.caption
    db.commit()
    db.refresh(design)
    return design