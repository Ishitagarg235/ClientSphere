from pydantic import BaseModel, EmailStr

class ContactCreateSchema(BaseModel):
    full_name: str
    email: EmailStr
    mobile: str
    city: str
