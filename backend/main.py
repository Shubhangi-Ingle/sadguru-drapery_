from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import categories, subcategories, products, sizes,reviews,auth
import models
from routers import categories, subcategories, products, sizes, reviews, auth as auth_router, designs

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sadguru Drapery API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://sadguru-drapery.vercel.app",
        "https://sadgurudrapery.shop",
        "https://www.sadgurudrapery.shop",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(categories.router)
app.include_router(subcategories.router)
app.include_router(products.router)
app.include_router(sizes.router)    
app.include_router(reviews.router)
app.include_router(auth.router)
app.include_router(designs.router)

@app.get("/")
def health_check():
    return {"status": "Sadguru Drapery API is running"}