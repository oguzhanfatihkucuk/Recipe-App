
<div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
  <img src="./assets/ProjectScreenShots/32Bit.png" alt="32Bit.png" style="width: 45%; margin: 10px;"/>
  <img src="./assets/ProjectScreenShots/Toyota.png" alt="Toyota.png" style="width: 45%; margin: 10px;"/>
</div>


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

## Before Run

### JSON Data Usage

Do not forget I have used my own JSON data in my app on my local internet. You are free to use your own data. 

You can find under this file the JSON data that I have used in my project. 
‘C:\Users\90533\Desktop\Basic_Store-main\assets\json\demo.json’. This is the JSON file that you have open with Mockoon. First copy this json file and put any directory and open it with Mockoon.

Make sure that you change your `IP address variable`  if you are going to use local JSON services. Update the IP address in `C:\Users\Recipe-App\assets\is\myIP.js`. Do not forget that you should use your IPV4 Ip address.

You can learn your IPV4 adress from your terminal.Search `cmd` on your computer and run `ipconfig`, you will see `IPv4 Address. . . . . . . . . . . : 172.16.20.225` something like this and copy IP adress.

After that you have to update your JSON services port.On directory `C:\Users\Recipe-App\assets\js\api.js` you should specify your port number that you are using on the localhost side.


### E-mail Service
In order to use e-mail service,before starting the mail server in the directory `C:\Users\Recipe-App\server`, you need to obtain an App Password or related API key for SMTP. 

Update the `pass` field with your credentials.This is the website of how you can generate your app password using Gmail SMTP
[ https://support.google.com/accounts/answer/185833?hl=en]

```js
pass: '################'
```

Additionally, update the sender email address:

```js
user: 'oguzhanfatihk@gmail.com'
```

After you made those changes, you should start Node.js project in directory `C:\Users\Recipe-App\server\server.js`

Do not forget! I have chosen port `3002 to SMTP server`. You should be aware of that. You should check if this port is available or not.




## Permissions

As default, these permissions were  provided by project but you should check if your emulator that you are using is available for these permissions.

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



## Usage Of App

### Login

User information is sourced from JSON data. There is a test user with `name: oguz` and `password: 123456` that allows access to the system.

### Products

In the transaction screen, there is an option labeled `Products`. Clicking on this option will display a list of available products. You can add products to your list by clicking on them. To add multiple quantities of the same product, press and hold (long press) to prompt a dialog asking for the quantity you wish to add. After this process, the products will be added to your list.

Additionally, there is an option for filtering and sorting products. By selecting `See All Products`, you can view all products and filter or sort them by `Categories`, `Prices`, `Alphabetically`, and more.

If you wish to delete a product, simply long press on the product in the list to prompt an alert for deletion. Alternatively, you can delete all products by selecting `Cancel All Document`.


### Sale

After adding products to your list, you can access the sales screen by clicking `Transaction/Sales`. Here, you will see the products on your list.

You can also add products by their ID using the `Enter Product ID` field and clicking `Add Product` to add them to the list.

Furthermore, you can quickly add products categorized on the left side.

Following these steps, you can adjust the quantity of products in your list.

You can apply campaigns before starting the sales process by selecting the option at the top-right of 

### Sale Confirm

There are two options to complete the sale process: cash and credit card. If you choose credit card, simply click `Payment By Credit Card`. Alternatively, for cash payment, enter the amount received under `Cash Received` and click `Confirm Sale`.

### E-mail

Only the cash option offers e-mail services. After entering the amount of cash received, the `E-archive` option becomes available. You can enter the customer's e-mail address, and the receipt will be sent to that e-mail.

### Add Product

This functionality is currently unavailable but is demonstrated. Follow this path: `Transaction/Add Product`, and click `Add New Products` after filling in the required fields.

### Reports

This screen provides information and charts for the app, accessible under `User Information`, `Z-Report`, `Campaigns`, and `Charts`.

`User Information`: Stores all registered user information.
`Z-Report`: Access receipts of sales made during the day, categorized as sent and unsent.
`Campaigns`: Detailed information about registered campaigns.
`Charts`: Reports on daily sales, including the number of sales, income generated, and total products sold via credit card and cash, presented in separate graphs.

### Explore Screen

This page lists and allows manual search of application features. Clicking on a feature directs you to its respective page.

### Settings Screen

This page is where application settings are managed. Settings include `sound, theme selection, language preference, logout, and security` options. Receipts that haven't been sent can be manually synchronized to the center.

## Provided Project Requirements

| Feature  | Applied  | Tested |
| :------------ |:---------------:| :-----:|
| Add Product                          |    ✓    |   ✓    |
| Adding Multiple Items to Cart         |    ✓    |   ✓    |
| Campaign List and Campaign Application|    ✓    |   ✓    |
| Choosing Products From Categories     |    ✓    |   ✓    |
| End of Day Reports                    |    ✓    |   ✓    |
| Explore Screen                        |    ✓    |   ✓    |
| Incorrect Login                       |    ✓    |   ✓    |
| Manual synchronization                |    ✓    |   ✓    |
| Multi Language                        |    ✓    |   ✓    |
| NfC Login                            |    ✓    |   ✓    |
| Other User Information Page           |    ✓    |   ✓    |
| Payment Process Cash-Credit Card      |    ✓    |   ✓    |
| Product Entry Via Barcode             |    ✓    |   ✓    |
| Product Sorting And Filtering         |    ✓    |   ✓    |
| Receipt Service By E-mail             |    ✓    |   ✓    |
| Reporting Past Sales                 |    ✓    |   ✓    |
| Responsive-Design                    |    ✓    |   ✓    |
| Row and Entire Document Canceled      |    ✓    |   ✓    |
| Staff-Register Information           |    ✓    |   ✓    |
| Store Status                         |    ✓    |   ✓    |
| Theme Selection                      |    ✓    |   ✓    |
| Version Information                  |    ✓    |   ✓    |
| View Shift Hours                     |    ✓    |   ✓    |
| Virtual Receipt Display - Save As PDF |    ✓    |   ✓    |

## Libraries Used In the Project

| Libraries                            | Module                               | Purpose                             |
|--------------------------------------|--------------------------------------|-------------------------------------|
| axios| axios| HTTP Requests, Fetching Data|
| expo-status-bar            | StatusBar  | User Interface Components                         |
| nodemailer            | nodemailer  | Sending Email                         |
| lottie-react-native| LottieView | Animations, UI Blocking|
| react| useContext, useState| State Management|
| react-i18next| useTranslation                       | Multilanguage                       |
| react-native|  View, Text, Image, TouchableOpacity, Modal, TextInput, Button, FlatList, SafeAreaView | User Interface Components                   |
| react-native                          | Alert, StyleSheet, Vibration, Platform, BackHandler, | Device Management                   |
| react-native-community/slider         | Slider                               |     User Interface Components                                |
| react-native-device-info              | DeviceInfo                           | Getting information of working devices |
| react-native-gifted-charts            | BarChart, PieChart                   | Data Visualization                  |
| react-native-html-to-pdf              | RNHTMLtoPDF                          | Save Receipts As PDF                |
| react-native-nfc-manager              | NfcManager, NfcTech                  | NFC Login                           |
| react-native-paper                    | Icon, Searchbar, Divider, TextInput, SegmentedButtons, Switch, Badge, List | User Interface Components                 |
| react-navigation/bottom-tabs          | createBottomTabNavigator             | Bottom Tab Navigation               |
| react-navigation/native-stack         | createNativeStackNavigator          | Navigation Stack                    |
| react-native-root-toast               | Toast                                | Toast Message                       |
| react-native-picker/picker            | Picker                               | User Interface Components                          |
| react-navigation/native            | NavigationContainer                               | Routes-Navigation                        |


## Screenshots
<div style="display: flex; flex-wrap: wrap;">
   <img src="./assets/ProjectScreenShots/AppLoading.png" alt="AppLoading.png" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/LoginScreen.png" alt="LoginScreen.png" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/ExploreScreen.png" alt="Explore Screen" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/ReportsScreen.png" alt="ReportsScreen" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/TransectionScreen.png" alt="TransectionScreen.png" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/ProfileScreen.png" alt="ProfileScreen" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/SettingsScreen.png" alt="SettingsScreen" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/DarkMode.png" alt="Dark Mode" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/Products.png" alt="Products" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/FilteringProducts.png" alt="Filtering Products" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/ProductsFiltering2.png" alt="Products Filtering" width="200" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/ProductsScreen.png" alt="Products Screen" width="200" style="margin: 10px;"/>
  
</div>

<div style="display: flex; flex-wrap: wrap;">
   <img src="./assets/ProjectScreenShots/SalesScreen.png" alt="Sales Screen " width="400" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/VirtualRecipe.png" alt="Virtual Recipe" width="400" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/Userlist.png" alt="Userlist" width="400" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/Campaings.png" alt="Campaings" width="400" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/ReportChart.png" alt="ReportChart" width="400" style="margin: 10px;"/>
   <img src="./assets/ProjectScreenShots/AddProducts.png" alt="AddProducts" width="400" style="margin: 10px;"/>
</div>

## Support

For support, send an e-mail to oguzhan.kucuk@ogr.sakarya.edu.tr.


## Lisans

[MIT](https://choosealicense.com/licenses/mit/)

