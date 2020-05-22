const wrapArray = (array, index) => {
  let result = array.slice(0);
  return result.concat(result.splice(0, index))
}

export { wrapArray };
