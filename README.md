

```markdown
# AI/ML Intern Assignment

This project is a web application that integrates OpenAI's Chat API for code summarization. The application is built using Flask for the backend and React for the frontend.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- npm (Node Package Manager)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. **Backend Setup:**

   - Create a virtual environment (recommended).

     ```bash
     python -m venv venv
     ```

   - Activate the virtual environment.

     - On Windows:

       ```bash
       .\venv\Scripts\activate
       ```

     - On macOS/Linux:

       ```bash
       source venv/bin/activate
       ```

   - Install the required Python packages.

     ```bash
     pip install -r requirements.txt

        (Flask==2.0.1
        Flask-Bcrypt==0.7.1
        Flask-Cors==3.0.10
        Flask-JWT-Extended==4.2.0
        Flask-SQLAlchemy==2.5.1
        gunicorn==20.1.0
        openai==0.27.0 )

     ```

   - Set the OpenAI API key in `app.py`:

     ```python
     openai.api_key = 'your-openai-api-key'
     ```

3. **Frontend Setup:**

   - Navigate to the React frontend directory.

     ```bash
     cd frontend/myreactde
     ```

   - Install the required npm packages.

     ```bash
     npm install
     ```

4. **Run the Application:**

   - Start the Flask backend.

     ```bash
     python app.py
     ```

   - In a new terminal, start the React frontend.

     ```bash
     npm start
     ```

   The application should be accessible at `http://localhost:3000/`.

## Project Structure

The project is structured as follows:

- **Backend:**
  - `app.py`: Flask application containing API routes and OpenAI integration.
  - `models.py`: SQLAlchemy models for the database.

- **Frontend:**
  - `frontend/myreactde`: React application containing components for login, registration, profile, and code summarization.

## Usage

1. **Register:**
   - Visit the registration page and create a new account.

2. **Login:**
   - After registration, log in using your credentials.

3. **Profile:**
   - View and edit your profile details.
   - Enter a code snippet to get a summary using the OpenAI Chat API.

## Features

- User authentication and authorization.
- Profile management.
- Code summarization using OpenAI Chat API.
- Simple and intuitive user interface.



