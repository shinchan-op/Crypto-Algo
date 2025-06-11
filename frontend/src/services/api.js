import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Symmetric encryption API calls
export const symmetricApi = {
  generateKey: () => api.post('/symmetric/generate-key'),
  encrypt: (plaintext, key) => api.post('/symmetric/encrypt', { plaintext, key }),
  decrypt: (ciphertext, key) => api.post('/symmetric/decrypt', { ciphertext, key }),
};

// Asymmetric encryption API calls
export const asymmetricApi = {
  generateKeyPair: (keySize = 2048) => api.post('/asymmetric/generate-key-pair', { key_size: keySize }),
  encrypt: (plaintext, publicKey) => api.post('/asymmetric/encrypt', { plaintext, public_key: publicKey }),
  decrypt: (ciphertext, privateKey) => api.post('/asymmetric/decrypt', { ciphertext, private_key: privateKey }),
};

// Hashing API calls
export const hashingApi = {
  getAlgorithms: () => api.get('/hash/algorithms'),
  hashText: (text, algorithm = 'sha256') => api.post('/hash/text', { text, algorithm }),
  hashFile: (file, algorithm = 'sha256') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('algorithm', algorithm);
    
    return axios.post(`${API_URL}/hash/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Key management API calls
export const keysApi = {
  generateRandomBytes: (length = 32) => api.post('/keys/random', { length }),
  deriveKey: (password, salt = null, length = 32) => api.post('/keys/derive', { password, salt, length }),
};

// Create a named variable for the default export
const apiService = {
  symmetric: symmetricApi,
  asymmetric: asymmetricApi,
  hashing: hashingApi,
  keys: keysApi,
};

export default apiService;