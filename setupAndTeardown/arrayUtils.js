const addToArray = (array, item) => {
    array.push(item);
    return array;
  };
  
  const removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  };
  
  const arrayContains = (array, item) => {
    return array.includes(item);
  };
  
  module.exports = { addToArray, removeFromArray, arrayContains };
  