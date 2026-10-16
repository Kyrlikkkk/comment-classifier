from sqlalchemy import select
from sqlalchemy.orm import Session

from pwdlib import PasswordHash

from app import models, schemas


password_hash = PasswordHash.recommended()


# Пользователи

def get_user(db: Session, user_id: int):
    return db.get(models.User, user_id)


def get_user_by_email(db: Session, email: str):
    statement = select(models.User).where(
        models.User.email == email
    )
    return db.scalar(statement)


def get_user_by_username(db: Session, username: str):
    statement = select(models.User).where(
        models.User.username == username
    )
    return db.scalar(statement)


def get_users(db: Session, skip: int = 0, limit: int = 100):
    statement = (
        select(models.User)
        .offset(skip)
        .limit(limit)
    )
    return list(db.scalars(statement).all())


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=password_hash.hash(user.password),
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def update_user(
    db: Session,
    db_user: models.User,
    user_data: schemas.UserUpdate,
):
    changes = user_data.model_dump(exclude_unset=True)

    for field, value in changes.items():
        setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)

    return db_user


def delete_user(db: Session, db_user: models.User):
    db.delete(db_user)
    db.commit()


# Комментарии

def get_comment(db: Session, comment_id: int):
    return db.get(models.Comment, comment_id)


def get_comments(
    db: Session,
    user_id: int | None = None,
    skip: int = 0,
    limit: int = 100,
):
    statement = select(models.Comment)

    if user_id is not None:
        statement = statement.where(
            models.Comment.user_id == user_id
        )

    statement = (
        statement
        .order_by(models.Comment.created_at.desc())
        .offset(skip)
        .limit(limit)
    )

    return list(db.scalars(statement).all())


def create_comment(
    db: Session,
    comment: schemas.CommentCreate,
    user_id: int,
):
    db_comment = models.Comment(
        text=comment.text,
        sentiment=comment.sentiment,
        user_id=user_id,
    )

    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)

    return db_comment


def update_comment(
    db: Session,
    db_comment: models.Comment,
    comment_data: schemas.CommentUpdate,
):
    changes = comment_data.model_dump(exclude_unset=True)

    for field, value in changes.items():
        if value is not None:
            setattr(db_comment, field, value)

    db.commit()
    db.refresh(db_comment)

    return db_comment


def delete_comment(db: Session, db_comment: models.Comment):
    db.delete(db_comment)
    db.commit()