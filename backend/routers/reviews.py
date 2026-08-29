from fastapi import APIRouter, Depends, HTTPException,UploadFile, File
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
import auth
router = APIRouter(prefix="/reviews", tags=["Reviews"])
import cloudinary.uploader
import cloudinary_config

# Customer submits a review (goes in as pending)
@router.post("/", response_model=schemas.ReviewOut)
def create_review(review: schemas.ReviewCreate, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == review.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    if review.rating < 1 or review.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    new_review = models.Review(
        customer_name=review.customer_name,
        rating=review.rating,
        comment=review.comment,
        product_id=review.product_id,
        is_approved=0
    )
    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review


# Public: only approved reviews for a product (this is what the website shows customers)
@router.get("/product/{product_id}", response_model=list[schemas.ReviewOut])
def get_approved_reviews(product_id: int, db: Session = Depends(get_db)):
    return db.query(models.Review).filter(
        models.Review.product_id == product_id,
        models.Review.is_approved == 1
    ).all()


# Admin: see ALL reviews (pending + approved) so owner can moderate
@router.get("/all", response_model=list[schemas.ReviewOut])
def get_all_reviews(db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    return db.query(models.Review).all()


# Admin: approve a review
@router.patch("/{review_id}/approve", response_model=schemas.ReviewOut)
def approve_review(review_id: int, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    review.is_approved = 1
    db.commit()
    db.refresh(review)
    return review


# Admin: reject/delete a review
@router.delete("/{review_id}")
def delete_review(review_id: int, db: Session = Depends(get_db), admin: models.AdminUser = Depends(auth.get_current_admin)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")
    db.delete(review)
    db.commit()
    return {"message": "Review deleted"}

@router.post("/{review_id}/upload-image", response_model=schemas.ReviewOut)
def upload_review_image(review_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    review = db.query(models.Review).filter(models.Review.id == review_id).first()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    result = cloudinary.uploader.upload(file.file)
    review.image_url = result["secure_url"]
    db.commit()
    db.refresh(review)
    return review