import { Alert, Linking } from "react-native";

export const handlePrivacyPress = () => {
  Alert.alert(
    "Privacy and Security",
    "Dear User, our company is committed to safeguarding your privacy and ensuring the security of your personal information. We comply with all applicable data protection laws, including the Turkish Personal Data Protection Law (KVKK). Here's a brief overview of your privacy rights and our data handling practices:\n\n" +

    "1. Collection of Information: We collect only the information necessary to provide our services to you. This may include personal information such as your name, email address, and contact details.\n\n" +

    "2. Use of Information: Your information is used solely for the purpose for which it was collected, such as processing your orders or providing customer support. We do not sell or share your information with third parties for marketing purposes.\n\n" +

    "3. Data Security: We employ industry-standard security measures to protect your information from unauthorized access, use, or disclosure. This includes encryption, firewalls, and access controls.\n\n" +

    "4. Your Rights: Under the KVKK, you have the right to access, rectify, or delete your personal information. You also have the right to object to the processing of your data or withdraw your consent.\n\n" +

    "5. Consent: By using our services, you consent to the collection, use, and disclosure of your information as described in our privacy policy.\n\n" +

    "For more information about how we handle your data and your privacy rights, please refer to our privacy policy on our website.\n\n" +

    "Thank you for trusting us with your personal information. If you have any questions or concerns, please don't hesitate to contact us.",

    [{ text: "OK" }]
  );
};

export const handleAboutUsPress = () => {
  Alert.alert(
    "About Us",
    "Welcome to our company! We are dedicated to providing high-quality products/services and exceptional customer service. Here's a brief overview of who we are and what we do:\n\n" +

    "Our Mission: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel odio quis justo lacinia volutpat.\n\n" +

    "Our Vision: Nulla facilisi. Donec fringilla fermentum nisl, sit amet interdum sem vehicula eget.\n\n" +

    "For more information about our company and our products/services, please visit our website:\n\n" +

    "1. Company Website: https://www.toyota-europe.com/\n" +
    "2. Blog: https://32bit.com.tr/\n\n" +

    "Contact Us:\n" +
    "Address: Bağdat Cad. Kumbaracılar Sk. No:18\n" +
    "Mine Palas Apt. Kat:4 D:8 34724\n" +
    "Feneryolu / İstanbul / Türkiye\n" +
    "Phone: +90 (216) 348 60 43\n" +
    "Email: sales@32bit.com.tr",
    [

      { text: "Company Website", onPress: () => Linking.openURL("https://www.toyota-europe.com/") },
      { text: "32Bit", onPress: () => Linking.openURL("https://32bit.com.tr/") },


      { text: "OK"},
    ]
  );
};


