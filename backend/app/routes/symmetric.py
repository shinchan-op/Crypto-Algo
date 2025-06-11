from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from app.crypto.symmetric import SymmetricEncryption
from typing import Dict

router = APIRouter()

class EncryptRequest(BaseModel):
    plaintext: str
    key: str

class DecryptRequest(BaseModel):
    ciphertext: str
    key: str

@router.post("/generate-key", response_model=Dict[str, str])
async def generate_key():
    """Generate a new key for symmetric encryption"""
    try:
        return SymmetricEncryption.generate_key()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/encrypt", response_model=Dict[str, str])
async def encrypt(request: EncryptRequest):
    """Encrypt plaintext using symmetric encryption"""
    try:
        return SymmetricEncryption.encrypt(request.plaintext, request.key)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/decrypt", response_model=Dict[str, str])
async def decrypt(request: DecryptRequest):
    """Decrypt ciphertext using symmetric encryption"""
    try:
        return SymmetricEncryption.decrypt(request.ciphertext, request.key)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))