from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import (
    project_routes,
    client_routes,
    contact_routes,
    newsletter_routes
)

app = FastAPI(
    title="ClientSphere Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "Backend is running"}

# Routers
app.include_router(project_routes.router, prefix="/api/projects", tags=["Projects"])
app.include_router(client_routes.router, prefix="/api/clients", tags=["Clients"])
app.include_router(contact_routes.router, prefix="/api/contacts", tags=["Contacts"])
app.include_router(newsletter_routes.router, prefix="/api/newsletter", tags=["Newsletter"])
