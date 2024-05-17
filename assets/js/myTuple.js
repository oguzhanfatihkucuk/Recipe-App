export let myTuple = [];

export const addItemToTuple = (item) => {

  if (!myTuple.includes(item)) {
    myTuple.push(item);
    console.log(myTuple)
  }
};
