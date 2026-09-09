from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
import cloudinary.uploader
import cloudinary_config
import auth

router = APIRouter(tags=["Sizes"])

# ---- Size Chart (per category) ----
@router.post("/size-charts/", response_model=schemas.SizeChartOut)
def create_size_chart(chart: schemas.SizeChartCreate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    if chart.category_id is not None:
        category = db.query(models.Category).filter(models.Category.id == chart.category_id).first()
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")

    new_chart = models.SizeChart(category_id=chart.category_id, chart_text=chart.chart_text)
    db.add(new_chart)
    db.commit()
    db.refresh(new_chart)
    return new_chart


@router.post("/size-charts/{chart_id}/upload-image", response_model=schemas.SizeChartOut)
def upload_size_chart_image(chart_id: int, file: UploadFile = File(...), db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    chart = db.query(models.SizeChart).filter(models.SizeChart.id == chart_id).first()
    if not chart:
        raise HTTPException(status_code=404, detail="Size chart not found")

    result = cloudinary.uploader.upload(file.file)
    chart.chart_image_url = result["secure_url"]
    db.commit()
    db.refresh(chart)
    return chart


@router.get("/size-charts/", response_model=list[schemas.SizeChartOut])
def list_size_charts(db: Session = Depends(get_db)):
    return db.query(models.SizeChart).all()


# ---- Product Sizes (per product) ----
@router.post("/product-sizes/", response_model=schemas.ProductSizeOut)
def add_product_size(size: schemas.ProductSizeCreate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    product = db.query(models.Product).filter(models.Product.id == size.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    new_size = models.ProductSize(
        size_label=size.size_label,
        is_available=1 if size.is_available else 0,
        restock_date=size.restock_date,
        product_id=size.product_id
    )
    db.add(new_size)
    db.commit()
    db.refresh(new_size)
    return new_size

@router.delete("/product-sizes/{size_id}")
def delete_product_size(size_id: int, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    size = db.query(models.ProductSize).filter(models.ProductSize.id == size_id).first()
    if not size:
        raise HTTPException(status_code=404, detail="Size not found")
    db.delete(size)
    db.commit()
    return {"message": "Size deleted"}

@router.patch("/size-charts/{chart_id}", response_model=schemas.SizeChartOut)
def update_size_chart(chart_id: int, update: schemas.SizeChartUpdate, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    chart = db.query(models.SizeChart).filter(models.SizeChart.id == chart_id).first()
    if not chart:
        raise HTTPException(status_code=404, detail="Size chart not found")
    if update.chart_text is not None:
        chart.chart_text = update.chart_text
    db.commit()
    db.refresh(chart)
    return chart


@router.delete("/size-charts/{chart_id}")
def delete_size_chart(chart_id: int, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    chart = db.query(models.SizeChart).filter(models.SizeChart.id == chart_id).first()
    if not chart:
        raise HTTPException(status_code=404, detail="Size chart not found")
    db.delete(chart)
    db.commit()
    return {"message": "Size chart deleted"}