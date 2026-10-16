from fastapi import FastAPI

from app.routers import users, comments


app = FastAPI(
    title="Comment Classifier API",
    description="API для классификации комментариев",
    version="1.0.0",
)

app.include_router(users.router)
app.include_router(comments.router)


@app.get("/")
def read_root():
    return {"message": "Comment Classifier API работает!"}
