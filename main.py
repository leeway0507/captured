from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from auth.router import router
from model.db_model import UserSchema

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3001",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(router, prefix="/api/auth", tags=['auth'])



@app.post("/test")
def read_root(req: UserSchema):
    return req


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str|None = None):
    return {"item_id": item_id, "q": q}
