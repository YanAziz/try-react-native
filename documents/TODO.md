# TODO: Aplikasi E-commerce React Native

## 📋 Overview

Aplikasi e-commerce sederhana dengan 2 layar utama menggunakan Redux Thunk dan Deep Linking.

## 🎯 Fitur Utama

### 1. Screens

- **HomeScreen**: Daftar produk dari API
- **DetailScreen**: Detail produk spesifik

### 2. Teknologi

- **Redux Thunk**: State management & API calls
- **Deep Linking**: Akses langsung ke detail produk
- **React Native + Expo**: Mobile development

## 🔧 Implementation

### Redux Thunk Flow

1. Component dispatch `fetchProducts()` atau `fetchProductDetail(id)`
2. Thunk handle API calls (fakestoreapi.com)
3. Auto manage: loading, success, error states
4. Update Redux state
5. Component re-render dengan data baru

### Deep Linking

- URL Scheme: `tokoku://`
- Contoh: `tokoku://product-detail/42`
- Buka detail produk langsung dari notifikasi/external link

## 📦 Dependencies

- `@reduxjs/toolkit` - State management
- `react-redux` - React bindings
- `expo-router` - Navigation & deep linking
- `react-native-reanimated` - Animations

## ✅ Checklist

- [ ] Setup Redux Thunk dengan createAsyncThunk
- [ ] Implement API service layer
- [ ] Buat HomeScreen dengan product list
- [ ] Buat DetailScreen dengan product info
- [ ] Setup deep linking configuration
- [ ] Implement error handling & loading states
- [ ] Tambahkan modern UI design
- [ ] Implement animasi & interactions
- [ ] Testing & optimization

## 🎨 Design Goals

- Modern purple/gold color scheme
- Smooth animations
- Card-based layouts
- Responsive design
- Clean typography

---

_Simple, focused, production-ready e-commerce app_
