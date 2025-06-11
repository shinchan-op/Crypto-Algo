from cryptography.fernet import Fernet
import base64
from typing import Dict, Optional

class SymmetricEncryption:
    @staticmethod
    def generate_key() -> Dict[str, str]:
        """Generate a new Fernet key for symmetric encryption"""
        key = Fernet.generate_key()
        return {"key": key.decode()}
    
    @staticmethod
    def encrypt(plaintext: str, key: str) -> Dict[str, str]:
        """Encrypt plaintext using Fernet symmetric encryption"""
        try:
            # Convert key from string to bytes
            key_bytes = key.encode()
            
            # Create a Fernet cipher with the provided key
            cipher = Fernet(key_bytes)
            
            # Encrypt the plaintext
            encrypted_data = cipher.encrypt(plaintext.encode())
            
            return {"ciphertext": encrypted_data.decode()}
        except Exception as e:
            raise ValueError(f"Encryption error: {str(e)}")
    
    @staticmethod
    def decrypt(ciphertext: str, key: str) -> Dict[str, str]:
        """Decrypt ciphertext using Fernet symmetric encryption"""
        try:
            # Convert key and ciphertext from string to bytes
            key_bytes = key.encode()
            ciphertext_bytes = ciphertext.encode()
            
            # Create a Fernet cipher with the provided key
            cipher = Fernet(key_bytes)
            
            # Decrypt the ciphertext
            decrypted_data = cipher.decrypt(ciphertext_bytes)
            
            return {"plaintext": decrypted_data.decode()}
        except Exception as e:
            raise ValueError(f"Decryption error: {str(e)}")