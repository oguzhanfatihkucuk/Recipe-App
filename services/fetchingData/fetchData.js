import API_URL, { API_URL_USR } from "../../assets/js/api";
//import axios from 'axios'; //This is optional to use axios

/*
Mockoon sağlayıcısının localhostta sağladığı verileri API aracılığıyla uygulamamıza çekmek için kullandığımız fonksiyon.

API_URL değişkeninin tuttuğu adrese istek atılması sonucu gelen veriyi response adlı veride tutuyoruz.Protokol süresince
bir problem çıkması ihtimaline karşı throw-exception ile response değerinin datalarımız haricinde başka bir değer almaması
sağlanmıştır.

Protokol sonunda bir sıkıntı yok iste response'dan gelen JSON datalarımızı parse işlemleri uygulayarak componentlerimizde
kullanılmak üzere bu fonksiyonu uygulamamıza global olarak her yer çağırıp kullanabiliyoruz.

*/
export const fetchMockBackendData = async () => {
  try {
    //const response = await axios.get(API_URL);
    const response = await fetch(API_URL);
    if (!response.ok) {
       new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching mock backend data:", error);
    return null;
  }
};

/*
Mockoon sağlayıcısının localhostta sağladığı verileri API aracılığıyla uygulamamıza çekmek için kullandığımız fonksiyon.

Bu endpoint'te uygulamaya erişim hakkı olan kullanıcıların bilgileri yer almaktadır.
*/
export const fetchMockBackendUserData = async () => {
  try {
    //const response = await axios.get(API_URL);
    const response = await fetch(API_URL_USR);
    if (!response.ok) {
      new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching mock backend data:", error);
    return null;
  }
};



