// sendEmail.js
import axios from 'axios';
import Toast from 'react-native-toast-message';
import MY_IP from "../../assets/js/myIp";


export const sendEmail = (email, myContent) => {
  axios.post(`http://${MY_IP}:3002/send-email`, {
    myAddress: email,
    content: myContent
  })
    .then(response => {
      Toast.show({
        type: 'success',
        text1: 'Success!!',
        text2: 'Email sent successfully',
        position: 'bottom'
      });
    })
    .catch(error => {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error!!',
        text2: 'Failed to send email',
        position: 'bottom'
      });
    });
};
