export let myTuple = [];


export const addItemToTuple = (item) => {
    myTuple.push(item);
    console.log(myTuple)
};

export const countItems = (productId) => {
  let count = 0;
  myTuple.forEach((item) => {
    if (item === productId) {
      count++;
    }

  });
  return count;
};
export const deleteItemToTuple = (item) => {
  const index = myTuple.indexOf(item);
  if (index !== -1) {
    myTuple.splice(index, 1);
    console.log(myTuple); // Updated myTuple without the deleted item
  } else {
    console.log("Item not found in myTuple");
  }
};
