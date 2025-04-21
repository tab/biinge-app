# Biinge

Biinge allows users to browse and track movies and TV shows, manage wish list, and discover new content.

## Features

- **Track Movies and TV Shows**: Keep track of what you want to watch and what you've already watched
- **In-Progress Tracking**: For TV shows, track individual episodes and seasons you've watched
- **Search**: Find movies and TV shows from TMDb's extensive database
- **Trending Content**: Discover popular movies, TV shows, and people
- **Detailed Information**: View details about movies, TV shows, episodes, and people
- **Visual Management**: Pin favorite content to the top of your lists
- **Dark/Light Themes**: Choose between dark and light themes or use system preferences
- **Statistics**: View detailed statistics about your watching habits, including total time spent watching

## Screenshots

![screenshots](https://github.com/user-attachments/assets/08474315-74c5-4677-847e-effa783401c3)

## Development Setup

Follow these steps to set up the development environment and run the application locally.

### Prerequisites

- Node.js (recommended version: 18.x or later)
- npm or yarn
- Xcode (for iOS development)
- CocoaPods
- Ruby
- Git

### Installation

1. Clone this repository
   ```sh
   git clone https://github.com/tab/biinge-app.git
   cd biinge-app
   ```

2. Install dependencies
   ```sh
   yarn install
   ```

3. Install CocoaPods dependencies
   ```sh
   cd ios
   pod install --repo-update
   cd ..
   ```

4. Create a `.env` file in the root of the project with the following variables:
   ```
   APP_ID=your_app_id
   TMDB_ACCESS_TOKEN=your_tmdb_access_token
   YOUTUBE_API_KEY=your_youtube_api_key
   SENTRY_DSN=your_sentry_dsn
   SENTRY_ENABLED=true
   ```

   Note: You'll need to obtain API keys from:
   - [TMDb API](https://developer.themoviedb.org/docs/getting-started)
   - [YouTube Data API](https://developers.google.com/youtube/v3/getting-started)
   - [Sentry](https://sentry.io) (optional for error tracking)

### Running the App

#### For iOS

1. Start the Metro bundler
   ```sh
   npx react-native start --reset-cache
   ```

2. Run the iOS app in the simulator
   ```sh
   npx react-native run-ios --verbose
   ```

   Alternatively, you can open the `ios/biinge.xcworkspace` file in Xcode and run the app from there.

## Building for Release

### iOS Release Build

1. Open the `ios/biinge.xcworkspace` file in Xcode

2. Select your connected iPhone or a target device in Xcode

3. Change the build configuration to "Release"
   - Select the project in the Project Navigator
   - Go to the "Build Settings" tab
   - Set "Release" in the "Configuration" section

4. Update the version and build number
   - Select the project in the Project Navigator
   - Go to the "General" tab
   - Update "Version" and "Build" fields as needed

5. Set code signing
   - Select the project in the Project Navigator
   - Go to the "Signing & Capabilities" tab
   - Select the appropriate provisioning profile for distribution

6. Build the app for your device
   - Select "Product" -> "Build"
   - After a successful build, select "Product" -> "Archive"

7. Distribute the app
   - In the Organizer window that appears, select the archive you just created
   - Click "Distribute App" and follow the prompts based on your distribution method
     - Ad Hoc: For testing on specific devices
     - App Store Connect: For submitting to the App Store
     - Enterprise: For in-house distribution

### Creating an IPA File for Ad Hoc Distribution

1. In the Organizer, after selecting "Distribute App"
2. Choose "Ad Hoc" distribution
3. Follow the prompts and select the devices you want to install the app on
4. Generate and download the IPA file
5. The IPA can be installed on registered devices using Apple Configurator or services like Diawi

## Technology Stack

- React Native
- Redux (with Redux Toolkit)
- React Navigation
- Realm Database
- TypeScript
- TMDb API
- Various React Native libraries (Reanimated, Fast Image, Flash List, etc.)

## Project Structure

- `app/`: Main application code
  - `components/`: UI components
  - `contexts/`: React contexts
  - `models/`: Realm database models
  - `redux/`: Redux store and slices
  - `screens/`: Application screens
  - `styles/`: Style definitions
  - `types/`: TypeScript type definitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).
