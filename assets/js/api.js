import MY_IP from "./myIp";   //Bilgisayarın bağlı olduğu IPV4 adresim
export const API_URL="http://"+MY_IP+":3000/products";  // Mockoon sağlayıcısın products datalarının end pointi
export const API_URL_USR="http://"+MY_IP+":3000/users"; // Mockoon sağlayıcısın user datalarının end pointi
export default API_URL;
