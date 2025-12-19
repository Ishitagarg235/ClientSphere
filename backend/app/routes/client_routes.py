from fastapi import APIRouter, UploadFile, File, Form
from app.models.client_model import client_collection
from app.utils.file_upload import save_file

router = APIRouter()

@router.post("/")
def add_client(
    name: str = Form(...),
    designation: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...)
):
    image_path = save_file(image)

    client_collection.insert_one({
        "name": name,
        "designation": designation,
        "description": description,
        "image_url": image_path
    })

    return {"message": "Client added successfully"}

@router.get("/")
def get_clients():
    return list(client_collection.find({}, {"_id": 0}))
