from database import SessionLocal
import models, auth

db = SessionLocal()

username = "abc"          # change if you'd like
password = "abc123"  # change to your real password

existing = db.query(models.AdminUser).filter(models.AdminUser.username == username).first()
if existing:
    print("Admin already exists.")
else:
    admin = models.AdminUser(username=username, hashed_password=auth.hash_password(password))
    db.add(admin)
    db.commit()
    print(f"Admin created: {username}")

db.close()