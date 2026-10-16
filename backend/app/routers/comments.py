from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db


router = APIRouter(prefix="/comments", tags=["Комментарии"])


@router.post("/", response_model=schemas.CommentResponse, status_code=status.HTTP_201_CREATED)
def create_comment(
    comment: schemas.CommentCreate,
    user_id: int,
    db: Session = Depends(get_db),
):
    if crud.get_user(db, user_id) is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return crud.create_comment(db, comment, user_id)


@router.get("/", response_model=list[schemas.CommentResponse])
def read_comments(
    user_id: int | None = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    if skip < 0 or not 1 <= limit <= 100:
        raise HTTPException(status_code=400, detail="skip должен быть неотрицательным, limit — от 1 до 100")
    return crud.get_comments(db, user_id=user_id, skip=skip, limit=limit)


@router.get("/{comment_id}", response_model=schemas.CommentResponse)
def read_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = crud.get_comment(db, comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="Комментарий не найден")
    return comment


@router.patch("/{comment_id}", response_model=schemas.CommentResponse)
def edit_comment(
    comment_id: int,
    comment_data: schemas.CommentUpdate,
    db: Session = Depends(get_db),
):
    comment = crud.get_comment(db, comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="Комментарий не найден")
    return crud.update_comment(db, comment, comment_data)


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = crud.get_comment(db, comment_id)
    if comment is None:
        raise HTTPException(status_code=404, detail="Комментарий не найден")
    crud.delete_comment(db, comment)