# Crypto-Algo Web Application

A comprehensive full-stack web application for demonstrating and experimenting with modern cryptographic algorithms. This project provides an intuitive interface for learning and implementing various cryptographic operations including symmetric encryption, asymmetric encryption, hashing, and secure key generation.

## 🚀 Features

### Cryptographic Operations
- **Symmetric Encryption**: AES-based Fernet encryption for fast, secure data encryption  
- **Asymmetric Encryption**: RSA encryption with OAEP padding and SHA-256 for secure key exchange  
- **Hashing**: Multiple algorithms including MD5, SHA-1, SHA-256, SHA-384, SHA-512, SHA3-256, and BLAKE2b  
- **Key Generation**:
  - Cryptographically secure random key generation using `os.urandom`
  - Password-based key derivation using PBKDF2 with SHA-256

### User Interface
- **Modern React Frontend**: Built with React 18 and Material-UI (MUI)  
- **Dark Theme**: Professional dark theme with animated backgrounds  
- **Responsive Design**: Mobile-friendly interface with drawer navigation  
- **Interactive Elements**: Hover effects, transitions, and intuitive user experience  
- **Real-time Operations**: Live encryption, decryption, and hashing operations  

## 🏗️ Architecture

### Backend (Python/FastAPI)
```
backend/
├── app/
│   ├── main.py                 # FastAPI application entry point
│   ├── crypto/                 # Cryptographic modules
│   │   ├── symmetric.py        # Fernet symmetric encryption
│   │   ├── asymmetric.py       # RSA asymmetric encryption
│   │   ├── hashing.py          # Hash algorithms implementation
│   │   └── key_gen.py          # Key generation utilities
│   └── routes/                 # API route handlers
│       ├── symmetric.py        # Symmetric encryption endpoints
│       ├── asymmetric.py       # Asymmetric encryption endpoints
│       ├── hashing.py          # Hashing endpoints
│       └── keys.py             # Key generation endpoints
└── requirements.txt            # Python dependencies
```

### Frontend (React/Material-UI)
```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── App.js                  # Main application component
│   ├── index.js                # React entry point
│   ├── components/             # Reusable UI components
│   │   ├── Layout.js           # Navigation and layout
│   │   └── HelpButton.js       # Help functionality
│   ├── pages/                  # Application pages
│   │   ├── HomePage.js         # Landing page with features
│   │   ├── SymmetricPage.js    # Symmetric encryption interface
│   │   ├── AsymmetricPage.js   # Asymmetric encryption interface
│   │   ├── HashingPage.js      # Hashing interface
│   │   └── KeyGenerationPage.js# Key generation interface
│   └── services/
│       └── api.js              # API communication layer
└── package.json                # Node.js dependencies
```

## 🛠️ Technology Stack

### Backend Dependencies
- **FastAPI (0.104.1)** - Modern, fast web framework for building APIs  
- **Uvicorn (0.23.2)** - ASGI server for running FastAPI applications  
- **Cryptography (41.0.4)** - Comprehensive cryptographic library  
- **Pydantic (2.4.2)** - Data validation and settings management  
- **Python-multipart (0.0.6)** - Form data parsing  
- **Python-dotenv (1.0.0)** - Environment variable management  

### Frontend Dependencies
- **React (18.2.0)** - Modern JavaScript library for building user interfaces  
- **Material-UI (5.14.16)** - React component library with Material Design  
- **React Router DOM (6.18.0)** - Declarative routing for React  
- **Axios (1.6.0)** - HTTP client for API communication  
- **Emotion** - CSS-in-JS library for styling  

## 🔧 Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python -m app.main
```
The API will be available at: `http://localhost:8000`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The web application will be available at: `http://localhost:3000`

## 📡 API Endpoints

### Symmetric Encryption
- `POST /api/symmetric/generate-key` - Generate Fernet key  
- `POST /api/symmetric/encrypt` - Encrypt plaintext  
- `POST /api/symmetric/decrypt` - Decrypt ciphertext  

### Asymmetric Encryption
- `POST /api/asymmetric/generate-key-pair` - Generate RSA key pair  
- `POST /api/asymmetric/encrypt` - Encrypt with public key  
- `POST /api/asymmetric/decrypt` - Decrypt with private key  

### Hashing
- `GET /api/hash/algorithms` - List available hash algorithms  
- `POST /api/hash/text` - Hash text input  
- `POST /api/hash/file` - Hash file content  

### Key Generation
- `POST /api/keys/generate-random` - Generate random bytes  
- `POST /api/keys/derive-from-password` - Derive key from password  

## 🎯 Use Cases
1. **Educational**: Learn cryptographic concepts through hands-on experimentation  
2. **Development**: Test encryption/decryption workflows during application development  
3. **Security Research**: Analyze different cryptographic algorithms and their properties  
4. **Prototyping**: Quickly implement and test cryptographic features  

## 🔒 Security Features
- **Industry Standard Algorithms**: Uses well-established cryptographic libraries  
- **Secure Random Generation**: Utilizes `os.urandom` for cryptographically secure randomness  
- **CORS Configuration**: Properly configured for cross-origin requests  
- **Input Validation**: Pydantic models ensure proper data validation  
- **Error Handling**: Comprehensive error handling for security operations  

## 🎨 UI/UX Features
- **Dark Theme**: Professional dark theme with blue and red accent colors  
- **Responsive Design**: Works seamlessly on desktop and mobile devices  
- **Interactive Cards**: Hover effects and smooth transitions  
- **Navigation**: Intuitive sidebar navigation with tooltips  
- **Real-time Feedback**: Immediate results for cryptographic operations  
- **Help Integration**: Built-in help system for user guidance  

## 📝 Development Notes
- The application uses CORS middleware to allow frontend-backend communication  
- All cryptographic operations are performed server-side for security  
- The frontend provides a clean, educational interface for complex cryptographic concepts  
- Error handling ensures graceful degradation and user-friendly error messages  
- The modular architecture allows for easy extension with additional cryptographic algorithms  

## 🚀 Future Enhancements
- Digital signature implementation  
- Certificate management  
- Blockchain cryptography examples  
- Performance benchmarking tools  
- Export/import functionality for keys and encrypted data  
- Advanced key management features  

---

This project serves as both an educational tool and a practical implementation reference for modern cryptographic operations in web applications.
