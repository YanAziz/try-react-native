# Dokumentasi Proyek React Native - Fresh Install

## 📱 Gambaran Umum

Dokumentasi ini menjelaskan kondisi proyek React Native saat pertama kali diinstall sebelum implementasi fitur sesuai TODO.md.

## 🚀 Setup Awal

### Inisialisasi Proyek

```bash
npx create-expo-app task-1
cd task-1
```

### Struktur Folder Awal

```
task-1/
├── assets/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── explore.tsx
│   │   └── index.tsx
│   ├── _layout.tsx
│   └── +html.tsx
├── components/
│   └── themed-text.tsx
├── constants/
├── hooks/
├── app.json
├── package.json
└── tsconfig.json
```

## 📋 Dependencies Awal

### package.json (Fresh Install)

```json
{
  "name": "task-1",
  "main": "expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~52.0.11",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.3",
    "expo-router": "~4.0.9"
  },
  "devDependencies": {
    "@types/react": "~18.3.12",
    "typescript": "^5.3.3"
  }
}
```

## 🏗️ Komponen Awal

### Available Components:

- **app/\_layout.tsx**: Root layout dengan Expo Router
- **app/(tabs)/\_layout.tsx**: Tab navigation (Home & Explore)
- **app/(tabs)/index.tsx**: Home screen basic
- **app/(tabs)/explore.tsx**: Explore screen placeholder
- **components/themed-text.tsx**: Custom text component

## 🔧 Konfigurasi Awal

### app.json

```json
{
  "expo": {
    "name": "task-1",
    "slug": "task-1",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "automatic"
  }
}
```

## ✅ vs ❌ Fitur

### ✅ Available:

- Tab navigation
- Basic theming
- Expo Router setup
- TypeScript configuration
- Responsive design

### ❌ Missing (sesuai TODO.md):

- State management (Redux Thunk)
- API integration (fakestoreapi.com)
- Product listing & detail screens
- Deep linking (tokoku://)
- Modern UI design
- Error handling & loading states
- Animations

## 🎯 Checklist Development

Berdasarkan TODO.md, checklist yang perlu dikerjakan:

- [ ] Setup Redux Thunk dengan createAsyncThunk
- [ ] Implement API service layer
- [ ] Buat HomeScreen dengan product list
- [ ] Buat DetailScreen dengan product info
- [ ] Setup deep linking configuration
- [ ] Implement error handling & loading states
- [ ] Tambahkan modern UI design
- [ ] Implement animasi & interactions

## 📊 Technical Debt

- Tidak ada arsitektur yang jelas
- Tidak ada state management
- Tidak ada separation of concerns
- Tidak ada reusable components
- Tidak ada error handling
- UI masih sangat basic

---

_Starting point untuk implementasi e-commerce app sesuai requirements TODO.md_
