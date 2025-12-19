from pydantic import BaseModel

class ProjectCreateSchema(BaseModel):
    name: str
    description: str
    image_url: str
