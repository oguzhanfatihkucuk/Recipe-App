export let reports = [];
export let reportsOffline = [];

let totalRevenueCash = 0;
let totalRevenueCreditCard = 0;

let numberOfCashSale = 0;
let numberOfCreditCardSale = 0;

let lenghtOfCashSale = 0;
let lenghtOfCreditCardSale = 0;

export const getNumberOfCashSale = () => numberOfCashSale;
export const getNumberOfCreditCardSale = () => numberOfCreditCardSale;

export const getTotalRevenueCash = () => totalRevenueCash;
export const getTotalRevenueCreditCard = () => totalRevenueCreditCard;

export const getTotalLenghtCash = () => lenghtOfCashSale;
export const getTotalLenghtCreditCard = () => lenghtOfCreditCardSale;

export const revenueCashInc = (price,lenght) => {
  numberOfCashSale++;
  totalRevenueCash += price;
  lenghtOfCashSale+=lenght;
  return totalRevenueCash;

};

export const revenueCreditInc = (price,lenght) => {
  numberOfCreditCardSale++;
  totalRevenueCreditCard += price;
  lenghtOfCreditCardSale+=lenght;
  return totalRevenueCreditCard;
};



export const addItemToReports = (item) => {

  if (!reports.includes(item)) {
    reports.push(item);

  }
};

export const addItemToReportsOffline = (item) => {

  if (!reportsOffline.includes(item)) {
    reportsOffline.push(item);
  }
};


export const transferOfflineRecipeToReports = () => {

  reportsOffline.forEach(item => {
    if (!reports.includes(item)) {
      reports.push(item);
    }
  });

  reportsOffline.length = 0;
};

