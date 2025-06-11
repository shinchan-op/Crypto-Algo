from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes, serialization
import base64
from typing import Dict, Tuple

class AsymmetricEncryption:
    @staticmethod
    def generate_key_pair(key_size: int = 2048) -> Dict[str, str]:
        """Generate an RSA key pair with the specified key size"""
        # Generate private key
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=key_size
        )
        
        # Extract public key
        public_key = private_key.public_key()
        
        # Serialize private key to PEM format
        private_pem = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption()
        ).decode('utf-8')
        
        # Serialize public key to PEM format
        public_pem = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ).decode('utf-8')
        
        return {
            "private_key": private_pem,
            "public_key": public_pem
        }
    
    @staticmethod
    def encrypt(plaintext: str, public_key_pem: str) -> Dict[str, str]:
        """Encrypt plaintext using RSA public key"""
        try:
            # Load public key from PEM
            public_key = serialization.load_pem_public_key(
                public_key_pem.encode('utf-8')
            )
            
            # Encrypt data
            ciphertext = public_key.encrypt(
                plaintext.encode('utf-8'),
                padding.OAEP(
                    mgf=padding.MGF1(algorithm=hashes.SHA256()),
                    algorithm=hashes.SHA256(),
                    label=None
                )
            )
            
            # Encode ciphertext as base64 for easy transmission
            encoded_ciphertext = base64.b64encode(ciphertext).decode('utf-8')
            
            return {"ciphertext": encoded_ciphertext}
        except Exception as e:
            raise ValueError(f"Encryption error: {str(e)}")
    
    @staticmethod
    def decrypt(ciphertext: str, private_key_pem: str) -> Dict[str, str]:
        """Decrypt ciphertext using RSA private key"""
        try:
            # Load private key from PEM
            private_key = serialization.load_pem_private_key(
                private_key_pem.encode('utf-8'),
                password=None
            )
            
            # Decode base64 ciphertext
            decoded_ciphertext = base64.b64decode(ciphertext)
            
            # Decrypt data
            plaintext = private_key.decrypt(
                decoded_ciphertext,
                padding.OAEP(
                    mgf=padding.MGF1(algorithm=hashes.SHA256()),
                    algorithm=hashes.SHA256(),
                    label=None
                )
            )
            
            return {"plaintext": plaintext.decode('utf-8')}
        except Exception as e:
            raise ValueError(f"Decryption error: {str(e)}")