from fastapi import APIRouter, HTTPException, Body
from pydantic import BaseModel
from app.crypto.asymmetric import AsymmetricEncryption
from typing import Dict, Optional

router = APIRouter()

class KeyPairRequest(BaseModel):
    key_size: Optional[int] = 2048

class EncryptRequest(BaseModel):
    plaintext: str
    public_key: str

class DecryptRequest(BaseModel):
    ciphertext: str
    private_key: str

@router.post("/generate-key-pair", response_model=Dict[str, str])
async def generate_key_pair(request: KeyPairRequest = Body(...)):
    """Generate a new RSA key pair"""
    try:
        return AsymmetricEncryption.generate_key_pair(request.key_size)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/encrypt", response_model=Dict[str, str])
async def encrypt(request: EncryptRequest):
    """Encrypt plaintext using RSA public key"""
    try:
        return AsymmetricEncryption.encrypt(request.plaintext, request.public_key)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/decrypt", response_model=Dict[str, str])
async def decrypt(request: DecryptRequest):
    """Decrypt ciphertext using RSA private key"""
    try:
        return AsymmetricEncryption.decrypt(request.ciphertext, request.private_key)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))