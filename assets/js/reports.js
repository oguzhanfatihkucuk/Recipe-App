export let reports = [];     // Mağaza çevrimiçi iken yapılan satış fişlerinin string olarak tutulduğu liste.
export let reportsOffline = []; // Mağaza çevrimdışı iken yapılan satış fişlerinin string olarak tutulduğu liste.

let totalRevenueCash = 0;    // Toplam nakit satış tutarı değerini tutan int değer.
let totalRevenueCreditCard = 0;  // Toplam kredi kartı satış tutarı değerini tutan int değer.

let numberOfCashSale = 0;  // Kaç adet nakit satış yapıldığını tutan int değer.
let numberOfCreditCardSale = 0; // Kaç adet kredi kartı satışı yapıldığını tutan int değer.

let lenghtOfCashSale = 0;  //Nakit olarak kaç adet ürün satıldığını tutan int değer.
let lenghtOfCreditCardSale = 0; //Kredi kartı olarak kaç adet ürün satıldığını tutan int değer.


export const getTotalRevenueCash = () => totalRevenueCash; // 4.satırda belirtilen int değerin "get" methodu.
export const getTotalRevenueCreditCard = () => totalRevenueCreditCard; // 5.satırda belirtilen int değerin "get" methodu.

export const getNumberOfCashSale = () => numberOfCashSale;   // 7.satırda belirtilen int değerin "get" methodu.
export const getNumberOfCreditCardSale = () => numberOfCreditCardSale; // 8.satırda belirtilen int değerin "get" methodu.

export const getTotalLenghtCash = () => lenghtOfCashSale; // 10.satırda belirtilen int değerin "get" methodu.
export const getTotalLenghtCreditCard = () => lenghtOfCreditCardSale; // 11.satırda belirtilen int değerin "get" methodu.



/*
Sistemde nakit satış  yapıldığı takdirde çağırılan method. "price"
satışta yapılan toplam tutar olarak ve "lenght" kaç
adet ürün satıldığını attribute alarak gerekli işlemleri yapıyor.
İlk olarak toplam nakit satış sayısını artırma işlemi yapıyor. (33.satır)
Toplam nakit satış değerini artırma işlemi yapıyor. (34.satır)
Toplam nakit satışındaki ürün sayısını artırma işlemi yapıyor. (31.satır)
*/
export const revenueCashInc = (price,lenght) => {
  numberOfCashSale++;
  totalRevenueCash += price;
  lenghtOfCashSale+=lenght;
  return totalRevenueCash;

};


/*
Sistemde kredi kartı satış  yapıldığı takdirde çağırılan method. "price"
satışta yapılan toplam tutar olarak ve "lenght" kaç
adet ürün satıldığını attribute alarak gerekli işlemleri yapıyor.
İlk olarak toplam kredi kartı satış sayısını artırma işlemi yapıyor. (49.satır)
Toplam kredi kartı satış değerini artırma işlemi yapıyor. (50.satır)
Toplam kredi kartı satışındaki ürün sayısını artırma işlemi yapıyor. (51.satır)
*/
export const revenueCreditInc = (price,lenght) => {
  numberOfCreditCardSale++;
  totalRevenueCreditCard += price;
  lenghtOfCreditCardSale+=lenght;
  return totalRevenueCreditCard;
};


/*Sistem online iken yapılan satışların fişlerini "reports" adlı listemize birer string olarak ekliyor.*/
export const addItemToReports = (item) => {

  if (!reports.includes(item)) {
    reports.push(item);

  }
};


/*Sistem offline iken yapılan satışların fişlerini "reports" adlı listemize birer string olarak ekliyor.*/
export const addItemToReportsOffline = (item) => {

  if (!reportsOffline.includes(item)) {
    reportsOffline.push(item);
  }
};


/*Mağaza offline iken oluşturan fişlerin "Manual Synchronization ile online iken yapılan satışların bulunduğu kısıma
aktarmak için kullanılan fonksiyon.*/
export const transferOfflineRecipeToReports = () => {

  reportsOffline.forEach(item => {
    if (!reports.includes(item)) {
      reports.push(item);
    }
  });

  reportsOffline.length = 0;
};

