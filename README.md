# Recipe-App

This project is based on the GitHub repository of the mobile cash register application carried out by Toyota and 32-Bit companies. Completed using the React Native framework version "0.73.6".

## Getting Started

To run this project on your local machine, follow the steps below.

### Requirements

Make sure the following software is installed to run this project:

- **Node.js version: v20.11.0**  
  [https://nodejs.org/en](https://nodejs.org/en)
- **npm version: 10.7.0**  
  [https://www.npmjs.com/](https://www.npmjs.com/)
- **Android Studio, Webstorm, or related IDEs**  
  [https://www.jetbrains.com/webstorm/](https://www.jetbrains.com/webstorm/)  
  [https://developer.android.com/studio?hl=tr](https://developer.android.com/studio?hl=tr)
- **An emulator device**
  You can create an Android device in Android Studio for free.
  [[https://developer.android.com/studio?hl=tr](https://developer.android.com/studio/run/managing-avds?hl=tr)]
- **Mockoon or related JSON services**  
  [https://mockoon.com/](https://mockoon.com/)

### Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/phoenix9897/Recipe-App.git
   ```
2. **Navigate to the project directory**:
   ```sh
   cd Recipe-App
   ```
3. **Install the necessary dependencies**:
   ```sh
   npm install
   ```
4. **Start node package manager**:
   ```sh
   npm start
   ```
5. **Choose an emulator**:
   - i - run on iOS
   - a - run on Android
   - d - open Dev Menu
   - r - reload app

### Before Run

Make sure that you change your IPV4 IP address if you are going to use local JSON services. Update the IP address in `C:\Users\90533\Desktop\Basic_Store-main\assets\js\myIP.js`.

Before starting the mail server in the directory `C:\Users\90533\Desktop\Basic_Store-main\server`, you need to obtain an App Password or related API key for SMTP. Update the `pass` field with your credentials:

```js
pass: '################'
```

Additionally, update the sender email address:

```js
user: 'oguzhanfatihk@gmail.com'
```
