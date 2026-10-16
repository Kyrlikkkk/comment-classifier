from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db


router = APIRouter(prefix="/users", tags=["Пользователи"])


@router.post("/", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=409, detail="Этот email уже зарегистрирован")

    if crud.get_user_by_username(db, user.username):
        raise HTTPException(status_code=409, detail="Это имя пользователя уже занято")

    try:
        return crud.create_user(db, user)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Пользователь с такими данными уже существует")


@router.get("/", response_model=list[schemas.UserResponse])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    if skip < 0 or not 1 <= limit <= 100:
        raise HTTPException(status_code=400, detail="skip должен быть неотрицательным, limit — от 1 до 100")
    return crud.get_users(db, skip=skip, limit=limit)


@router.get("/{user_id}", response_model=schemas.UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return user


@router.patch("/{user_id}", response_model=schemas.UserResponse)
def edit_user(user_id: int, user_data: schemas.UserUpdate, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    if user_data.username is not None:
        existing = crud.get_user_by_username(db, user_data.username)
        if existing and existing.id != user_id:
            raise HTTPException(status_code=409, detail="Это имя пользователя уже занято")

    if user_data.email is not None:
        existing = crud.get_user_by_email(db, user_data.email)
        if existing and existing.id != user_id:
            raise HTTPException(status_code=409, detail="Этот email уже зарегистрирован")

    try:
        return crud.update_user(db, user, user_data)
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="Конфликт уникальных данных")


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    crud.delete_user(db, user)