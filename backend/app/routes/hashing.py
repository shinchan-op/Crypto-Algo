from fastapi import APIRouter, HTTPException, Body, UploadFile, File, Form
from pydantic import BaseModel
from app.crypto.hashing import HashingService, HashAlgorithm
from typing import Dict, List, Optional

router = APIRouter()

class TextHashRequest(BaseModel):
    text: str
    algorithm: Optional[HashAlgorithm] = HashAlgorithm.SHA256

@router.get("/algorithms", response_model=List[str])
async def get_algorithms():
    """Get a list of available hashing algorithms"""
    return HashingService.get_available_algorithms()

@router.post("/text", response_model=Dict[str, str])
async def hash_text(request: TextHashRequest):
    """Generate hash for the provided text"""
    try:
        return HashingService.hash_text(request.text, request.algorithm)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/file", response_model=Dict[str, str])
async def hash_file(
    file: UploadFile = File(...),
    algorithm: Optional[HashAlgorithm] = Form(HashAlgorithm.SHA256)
):
    """Generate hash for the uploaded file"""
    try:
        file_content = await file.read()
        return HashingService.hash_file(file_content, algorithm)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))