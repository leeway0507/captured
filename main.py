"fastapi app"
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from router.auth.router import auth_router
from router.mypage.router import mypage_router

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3001",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(mypage_router, prefix="/api/mypage", tags=["mypage"])


# 422 error handler
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """422 error handler"""

    print(exc.errors())
    print(request.headers)
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "body": exc.body},
    )
