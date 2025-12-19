from fastapi import APIRouter
from app.models.contact_model import contact_collection
from app.schemas.contact_schema import ContactCreateSchema

router = APIRouter()

@router.post("/")
def submit_contact(data: ContactCreateSchema):
    contact_collection.insert_one(data.dict())
    return {"message": "Contact form submitted"}

@router.get("/")
def get_contacts():
    return list(contact_collection.find({}, {"_id": 0}))
    
