# Nirajfy 🎵

A modern music streaming application built with React, Vite, and Firebase.

## Features

- 🎵 Music player with play/pause, next/previous controls
- 📤 Upload songs with cover art
- 🔥 Firebase integration for storage and database
- 🎨 Modern, responsive UI
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend**: React + Vite
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: Firebase Auth
- **Styling**: CSS

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Git (for version control)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd nirajfy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Enable **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Start in production mode or test mode
4. Enable **Storage**:
   - Go to Storage
   - Click "Get started"
   - Set up security rules
5. Enable **Authentication** (optional):
   - Go to Authentication
   - Enable your preferred sign-in methods

#### Get Firebase Configuration

1. In Firebase Console, go to Project Settings (⚙️ icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app and copy the configuration

#### Set Up Environment Variables

1. Copy the `.env.example` file to create your own `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and replace the placeholder values with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

⚠️ **IMPORTANT**: Never commit your `.env` file to GitHub! It contains sensitive API keys.

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## Deploying to GitHub

### Initial Setup

1. **Install Git** (if not already installed):
   - Download from [git-scm.com](https://git-scm.com/download/win)
   - Install with default settings

2. **Initialize Git Repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository
   - Don't initialize with README (we already have one)

4. **Connect to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Setting Up GitHub Secrets (for CI/CD)

If you want to deploy automatically using GitHub Actions:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each Firebase environment variable:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`

## Firebase Security Rules

### Firestore Rules (Example)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /songs/{songId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules (Example)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /songs/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /covers/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Project Structure

```
nirajfy/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Player.jsx   # Music player component
│   │   └── Upload.jsx   # Upload component
│   ├── firebase.js      # Firebase configuration
│   ├── data.js          # Sample data
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables (not committed)
├── .env.example         # Environment template
├── .gitignore           # Git ignore rules
└── package.json         # Dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ by Niraj
