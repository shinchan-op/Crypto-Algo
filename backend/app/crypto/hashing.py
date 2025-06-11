import hashlib
from typing import Dict, List
from enum import Enum

class HashAlgorithm(str, Enum):
    MD5 = "md5"
    SHA1 = "sha1"
    SHA256 = "sha256"
    SHA384 = "sha384"
    SHA512 = "sha512"
    SHA3_256 = "sha3_256"
    BLAKE2B = "blake2b"

class HashingService:
    @staticmethod
    def get_available_algorithms() -> List[str]:
        """Return a list of available hashing algorithms"""
        return [algo.value for algo in HashAlgorithm]
    
    @staticmethod
    def hash_text(text: str, algorithm: HashAlgorithm = HashAlgorithm.SHA256) -> Dict[str, str]:
        """Generate hash for the provided text using the specified algorithm"""
        try:
            # Convert text to bytes
            text_bytes = text.encode('utf-8')
            
            # Create hash object based on algorithm
            if algorithm == HashAlgorithm.MD5:
                hash_obj = hashlib.md5(text_bytes)
            elif algorithm == HashAlgorithm.SHA1:
                hash_obj = hashlib.sha1(text_bytes)
            elif algorithm == HashAlgorithm.SHA256:
                hash_obj = hashlib.sha256(text_bytes)
            elif algorithm == HashAlgorithm.SHA384:
                hash_obj = hashlib.sha384(text_bytes)
            elif algorithm == HashAlgorithm.SHA512:
                hash_obj = hashlib.sha512(text_bytes)
            elif algorithm == HashAlgorithm.SHA3_256:
                hash_obj = hashlib.sha3_256(text_bytes)
            elif algorithm == HashAlgorithm.BLAKE2B:
                hash_obj = hashlib.blake2b(text_bytes)
            else:
                raise ValueError(f"Unsupported algorithm: {algorithm}")
            
            # Get hexadecimal digest
            hash_hex = hash_obj.hexdigest()
            
            return {
                "algorithm": algorithm,
                "hash": hash_hex
            }
        except Exception as e:
            raise ValueError(f"Hashing error: {str(e)}")
    
    @staticmethod
    def hash_file(file_content: bytes, algorithm: HashAlgorithm = HashAlgorithm.SHA256) -> Dict[str, str]:
        """Generate hash for the provided file content using the specified algorithm"""
        try:
            # Create hash object based on algorithm
            if algorithm == HashAlgorithm.MD5:
                hash_obj = hashlib.md5(file_content)
            elif algorithm == HashAlgorithm.SHA1:
                hash_obj = hashlib.sha1(file_content)
            elif algorithm == HashAlgorithm.SHA256:
                hash_obj = hashlib.sha256(file_content)
            elif algorithm == HashAlgorithm.SHA384:
                hash_obj = hashlib.sha384(file_content)
            elif algorithm == HashAlgorithm.SHA512:
                hash_obj = hashlib.sha512(file_content)
            elif algorithm == HashAlgorithm.SHA3_256:
                hash_obj = hashlib.sha3_256(file_content)
            elif algorithm == HashAlgorithm.BLAKE2B:
                hash_obj = hashlib.blake2b(file_content)
            else:
                raise ValueError(f"Unsupported algorithm: {algorithm}")
            
            # Get hexadecimal digest
            hash_hex = hash_obj.hexdigest()
            
            return {
                "algorithm": algorithm,
                "hash": hash_hex
            }
        except Exception as e:
            raise ValueError(f"Hashing error: {str(e)}")