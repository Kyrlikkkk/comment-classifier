
from fastapi import FastAPI

app = FastAPI(
    title="Comment Classifier API",
    description="API для классификации комментариев",
    version="1.0.0",
)


@app.get("/")
def read_root():
    return {"message": "Comment Classifier API работает!"}
