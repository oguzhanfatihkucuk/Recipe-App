# Recipe-App

This project is based on the GitHub repository of the mobile cash register application carried out by Toyota and 32-Bit companies. Completed using the `React Native` framework version `"0.73.6"`.

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
  [https://developer.android.com/studio?hl=tr](https://developer.android.com/studio/run/managing-avds?hl=tr)
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
   - i - run on `iOS`
   - a - run on `Android`
   - d - open `Dev Menu`
   - r - `reload app`

### Before Run

Do not forget I have used my own JSON data in my app on my local internet. You are free to use your own data.

Make sure that you change your `IP address variable`  if you are going to use local JSON services. Update the IP address in `C:\Users\Recipe-App\assets\js\myIP.js`.

After that you have to update your JSON services port.On directory `C:\Users\Recipe-App\assets\js\api.js` you should specify your port number that you are using localhost side.

Before starting the mail server in the directory `C:\Users\Recipe-App\server`, you need to obtain an App Password or related API key for SMTP. Update the `pass` field with your credentials:

```js
pass: '################'
```

Additionally, update the sender email address:

```js
user: 'oguzhanfatihk@gmail.com'
```

After you made those changes, you should start Node.js project in directory `C:\Users\Recipe-App\server\server.js`

Do not forget! I have chosen port `3002 to STMP server`. You should be aware of that. You should check if this port is available or not.

At `C:\Users\Recipe-App\android\app\src\main\AndroidManifest.xml`. You should give those permissions:

```sh
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.NFC" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    .
    .
    .
</manifest>
```






