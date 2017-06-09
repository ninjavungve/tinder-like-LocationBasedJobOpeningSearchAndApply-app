export const sortBy = property => function (a, b) {
  if (a[property] < b[property]) {
    return -1;
  } else if (a[property] > b[property]) {
    return 1;
  }
  return 0;
};


export const unsortBy = property => function (a, b) {
  if (a[property] < b[property]) {
    return 1;
  } else if (a[property] > b[property]) {
    return -1;
  }
  return 0;
};


export const is_ascending_sorted = (array, field) => {
  const len = array.length - 1;
  for (let i = 0; i < len; i += 1) {
    if (array[i][field] > array[i + 1][field]) {
      return false;
    }
  }
  return true;
};


export const is_descending_sorted = (array, field) => {
  const len = array.length - 1;
  for (let i = 0; i < len; i += 1) {
    if (array[i][field] < array[i + 1][field]) {
      return false;
    }
  }
  return true;
};
