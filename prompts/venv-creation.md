# Virtual Environment Setup & Dependencies

## Virtual Environment Created
✅ Python virtual environment created at: `website/venv/`

## Activation
```bash
# Activate the virtual environment
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate  # Windows
```

## Website Initialization Plan Dependencies

### Frontend Setup (Node.js/npm - separate from Python venv)
- [ ] React + Vite: `npm create vite@latest sustainability-buddy -- --template react`
- [ ] Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
- [ ] Icons & Routing: `npm install lucide-react react-router-dom`

### Backend/API Dependencies (Python - install in venv)

#### Core Framework
- [ ] **FastAPI** - Modern, fast web framework for building APIs
  ```bash
  pip install fastapi uvicorn[standard]
  ```

#### Database & ORM
- [ ] **SQLAlchemy** - SQL toolkit and ORM
  ```bash
  pip install sqlalchemy
  ```
- [ ] **Alembic** - Database migration tool
  ```bash
  pip install alembic
  ```
- [ ] **PostgreSQL driver** (if using PostgreSQL)
  ```bash
  pip install psycopg2-binary
  ```
- [ ] **SQLite** (built-in, but may need additional tools)
  ```bash
  pip install sqlite3  # Usually built-in
  ```

#### Geolocation & Mapping
- [ ] **geopy** - Geocoding library for location services
  ```bash
  pip install geopy
  ```
- [ ] **requests** - HTTP library for API calls (maps, weather, etc.)
  ```bash
  pip install requests
  ```

#### Data Processing
- [ ] **pandas** - Data manipulation and analysis
  ```bash
  pip install pandas
  ```
- [ ] **numpy** - Numerical computing
  ```bash
  pip install numpy
  ```

#### Environmental Data & APIs
- [ ] **python-dotenv** - Environment variable management
  ```bash
  pip install python-dotenv
  ```
- [ ] **httpx** - Async HTTP client (alternative to requests)
  ```bash
  pip install httpx
  ```

#### Authentication & Security
- [ ] **python-jose[cryptography]** - JWT token handling
  ```bash
  pip install python-jose[cryptography]
  ```
- [ ] **passlib[bcrypt]** - Password hashing
  ```bash
  pip install passlib[bcrypt]
  ```
- [ ] **python-multipart** - Required for FastAPI file uploads
  ```bash
  pip install python-multipart
  ```

#### Testing (Development)
- [ ] **pytest** - Testing framework
  ```bash
  pip install pytest pytest-asyncio httpx
  ```

#### Code Quality (Development)
- [ ] **black** - Code formatter
  ```bash
  pip install black
  ```
- [ ] **flake8** - Linter
  ```bash
  pip install flake8
  ```

## Quick Install Command (All Backend Dependencies)
Once venv is activated, run:
```bash
pip install fastapi uvicorn[standard] sqlalchemy alembic geopy requests pandas numpy python-dotenv httpx python-jose[cryptography] passlib[bcrypt] python-multipart pytest pytest-asyncio black flake8
```

## Requirements File
After installing dependencies, generate requirements.txt:
```bash
pip freeze > requirements.txt
```

## Notes
- Frontend dependencies (React, Tailwind, etc.) are managed via npm, not Python venv
- Python venv is for backend API, data processing, and server-side logic
- Consider creating separate requirements files:
  - `requirements.txt` - Production dependencies
  - `requirements-dev.txt` - Development dependencies (testing, linting)

