from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from app.crypto.key_gen import KeyGenerator
from typing import Dict, Optional

router = APIRouter()

class RandomBytesRequest(BaseModel):
    length: Optional[int] = 32

class DeriveKeyRequest(BaseModel):
    password: str
    salt: Optional[str] = None
    length: Optional[int] = 32

@router.post("/random", response_model=Dict[str, str])
async def generate_random_bytes(request: RandomBytesRequest = Body(...)):
    """Generate cryptographically secure random bytes"""
    try:
        return KeyGenerator.generate_random_bytes(request.length)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/derive", response_model=Dict[str, str])
async def derive_key(request: DeriveKeyRequest):
    """Derive a key from a password"""
    try:
        return KeyGenerator.derive_key_from_password(
            request.password,
            request.salt,
            request.length
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))