from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserUpdate(BaseModel):
    username: str | None = Field(
        default=None,
        min_length=3,
        max_length=50,
    )
    email: EmailStr | None = None


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr

    model_config = ConfigDict(from_attributes=True)



class CommentCreate(BaseModel):
    text: str = Field(min_length=1)
    sentiment: str = Field(pattern="^(positive|negative)$")


class CommentUpdate(BaseModel):
    text: str | None = Field(default=None, min_length=1)
    sentiment: str | None = Field(
        default=None,
        pattern="^(positive|negative)$",
    )


class CommentResponse(BaseModel):
    id: int
    text: str
    sentiment: str
    created_at: datetime
    user_id: int

    model_config = ConfigDict(from_attributes=True)