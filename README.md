# 🛍️ XYZ Store - React Native E-Commerce App

A modern e-commerce mobile application built with React Native and Expo, featuring a beautiful UI, product catalog, and seamless shopping experience.

## 📱 About This Project

XYZ Store is a group project developed as part of our mobile development course. The app showcases:

- **Product Catalog**: Browse and search through various products
- **Modern UI**: Clean, responsive design with smooth animations
- **State Management**: Redux Toolkit for efficient state handling
- **Navigation**: Expo Router for seamless navigation
- **Cross-Platform**: Works on iOS, Android, and Web

## 🚀 Features

- 📦 Product listing with categories
- 🎨 Beautiful gradient headers and animations
- 📱 Responsive design for all screen sizes
- 📊 Real-time product statistics
- 🎯 Product detail views

## 🛠️ Tech Stack

- **Frontend**: React Native
- **Framework**: Expo SDK
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Redux Toolkit + React Redux
- **Styling**: StyleSheet with themed components
- **Icons**: Expo Vector Icons
- **Animations**: React Native Reanimated
- **TypeScript**: Full type safety

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn
- Expo Go app (for testing on device)
- Android Studio / Xcode (for emulator testing)

## 🏃‍♂️ Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd task-1
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Run on your preferred platform**
   - **Mobile Device**: Scan QR code with Expo Go app
   - **Android**: Press `a` to open in Android emulator
   - **iOS**: Press `i` to open in iOS simulator
   - **Web**: Press `w` to open in browser

## 📁 Project Structure

```
task-1/
├── app/                    # App screens and routing
│   ├── (tabs)/            # Tab navigation screens
│   ├── product-detail/    # Product detail screens
│   └── _layout.tsx        # Root layout configuration
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── store/                # Redux store configuration
├── services/             # API services
├── constants/            # App constants and themes
└── assets/               # Images and static assets
```

## 🎨 UI Components

The app includes several custom components:

- `ProductCard`: Display product information
- `ThemedView/ThemedText`: Theme-aware components
- `LoadingIndicator`: Loading state feedback
- `ErrorMessage`: Error handling display
- `ParallaxScrollView`: Custom scrollable container

## 🔧 Available Scripts

- `npm start` - Start the development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run reset-project` - Reset to blank project template

## 👥 Team Members

This project is developed collaboratively by:

### 👨‍💻 **Development Team**

- **Member 1** - (2203040007) - Farrassyah Handa Saputra
- **Member 2** - (2203040036) - Reyyan
- **Member 3** - (2203040042) - Toyib Abdullah
- **Member 4** - (2203040063) - Azhar Danica Budi Zulfalillah
- **Member 4** - (2203040066) - Iqyan Aziz Syamaidzar

### 📝 **Contributions**

- **Product Design**: Team collaboration on wireframes and mockups
- **Code Review**: Peer reviews for code quality
- **Testing**: Manual testing across different devices
- **Documentation**: README and inline documentation

## 🤝 Contributing

Since this is a group project, please follow these guidelines:

1. Create a new branch for your features
2. Write clean, commented code
3. Test your changes thoroughly
4. Update documentation as needed
5. Coordinate with team members before merging

## 📱 Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web (Experimental)

## 🐛 Troubleshooting

If you encounter issues:

1. Clear Expo cache: `expo start -c`
2. Reset project: `npm run reset-project`
3. Check Node.js version compatibility
4. Ensure all dependencies are installed

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)

## 📄 License

This project is part of an educational assignment. Please contact the team members for usage permissions.

---

**Happy Shopping! 🛒**
