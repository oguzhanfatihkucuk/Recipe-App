export let myTuple = [];

export const addItemToTuple = (item) => {

  if (!myTuple.includes(item)) {
    myTuple.push(item);
    console.log(myTuple)
  }
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
