
/*Uygulama içinde sepete eklenen ürünlerin ProductId değerini tutacak olan liste.
* ProductID değişkeni bu listede string bir ifade olarak tutalacak. */
export let myTuple = [];


/*Seçilen ürünün Id değerini listeye eklemek için kullandığımız fonksiyon."item" burada ProductId' ye karşılık geliyor. */
export const addItemToTuple = (item) => {
    myTuple.push(item);
    console.log(myTuple)
};


/*Sepette olan toplam ürün sayısını geri döndüren fonksiyon.*/
export const countItems = (productId) => {
  let count = 0;
  myTuple.forEach((item) => {
    if (item === productId) {
      count++;
    }

  });
  return count;
};


/* Sepette var olan ürünün ProductId ile listeden dolayısıyla sepetten silinmesini sağlayan fonksiyon.
ProductId burada item olarak fonksiyona referans gösterilerek."myTuple" adlı listemizden siliniyor.
Bu özellik Sales sayfasında sepette olan ürünlerin LongPress aktivitesi gerçekleştiği takdirde çağırılıyor.
Bu fonksiyonun amacı sepette olan ayın id değerine sahip ürünlerin hepsinin sepetten silinmesi için kullanılıyor.*/
export const deleteItemToTuple = (item) => {

  const index = myTuple.indexOf(item);
  if (index !== -1) {
    myTuple.splice(index, 1);
    console.log(myTuple);
  } else {
    console.log("Item not found in myTuple");
  }
};


/* Sepette var olan ürünün ProductId ile listeden dolayısıyla sepetten silinmesini sağlayan fonksiyon.
ProductId burada item olarak fonksiyona referans gösterilerek."myTuple" adlı listemizden kaldırılıyor.
Bu özellik Sales sayfasında sepette olan ürünlerin sağ tarafında bulunan "-" butonuna basıldığı takdirde çalışıyor
genel olarak sepette birden fazla ürün olduğu zaman ürün sayısın azaltmak için kullanılıyor.*/
export const deleteItemFromTuple = (item) => {
  let index = myTuple.indexOf(item);
  while (index !== -1) {
    myTuple.splice(index, 1);
    index = myTuple.indexOf(item);
  }
  console.log(myTuple);
};
