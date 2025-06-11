from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import symmetric, asymmetric, hashing, keys

app = FastAPI(
    title="Crypto-Algo API",
    description="A RESTful API for cryptographic operations including encryption, key generation, and hashing",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(symmetric.router, prefix="/api/symmetric", tags=["Symmetric Encryption"])
app.include_router(asymmetric.router, prefix="/api/asymmetric", tags=["Asymmetric Encryption"])
app.include_router(hashing.router, prefix="/api/hash", tags=["Hashing"])
app.include_router(keys.router, prefix="/api/keys", tags=["Key Management"])

@app.get("/")
async def root():
    return {"message": "Welcome to Crypto-Algo API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)