import os
import base64
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from typing import Dict

class KeyGenerator:
    @staticmethod
    def generate_random_bytes(length: int = 32) -> Dict[str, str]:
        """Generate cryptographically secure random bytes"""
        random_bytes = os.urandom(length)
        encoded = base64.b64encode(random_bytes).decode('utf-8')
        return {"key": encoded}
    
    @staticmethod
    def derive_key_from_password(password: str, salt: str = None, length: int = 32) -> Dict[str, str]:
        """Derive a key from a password using PBKDF2"""
        try:
            # Generate salt if not provided
            if salt is None:
                salt = os.urandom(16)
                salt_b64 = base64.b64encode(salt).decode('utf-8')
            else:
                # Decode provided salt from base64
                salt = base64.b64decode(salt)
                salt_b64 = salt
            
            # Create PBKDF2HMAC instance
            kdf = PBKDF2HMAC(
                algorithm=hashes.SHA256(),
                length=length,
                salt=salt,
                iterations=100000,
            )
            
            # Derive key from password
            key = kdf.derive(password.encode('utf-8'))
            key_b64 = base64.b64encode(key).decode('utf-8')
            
            return {
                "key": key_b64,
                "salt": salt_b64 if isinstance(salt_b64, str) else salt_b64.decode('utf-8')
            }
        except Exception as e:
            raise ValueError(f"Key derivation error: {str(e)}")