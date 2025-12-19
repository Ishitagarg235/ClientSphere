from fastapi import APIRouter, UploadFile, File, Form
from app.models.project_model import project_collection
from app.utils.file_upload import save_file

router = APIRouter()

@router.post("/")
def add_project(
    name: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...)
):
    image_path = save_file(image)

    project_collection.insert_one({
        "name": name,
        "description": description,
        "image_url": image_path
    })

    return {"message": "Project added successfully"}

@router.get("/")
def get_projects():
    return list(project_collection.find({}, {"_id": 0}))
