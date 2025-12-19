from pydantic import BaseModel

class ClientCreateSchema(BaseModel):
    name: str
    designation: str
    description: str
    image_url: str
