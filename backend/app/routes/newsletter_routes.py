from fastapi import APIRouter
from app.models.newsletter_model import newsletter_collection
from app.schemas.newsletter_schema import NewsletterSubscribeSchema

router = APIRouter()

@router.post("/")
def subscribe(data: NewsletterSubscribeSchema):
    newsletter_collection.insert_one(data.dict())
    return {"message": "Subscribed successfully"}

@router.get("/")
def get_subscribers():
    return list(newsletter_collection.find({}, {"_id": 0}))
