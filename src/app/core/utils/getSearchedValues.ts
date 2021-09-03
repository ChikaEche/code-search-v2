export const getSearchedValues = (value: string[], searchString: string) => {
  const searchedValues: string[][] = [];

  value.forEach((eachString, index) => {
    if(eachString.includes(searchString)) {
      searchedValues.push([]);
      const lastIdx = searchedValues.length - 1; 
      if(index !== 0) {
        searchedValues[lastIdx].push(value[index - 1])
      }

      searchedValues[lastIdx].push(value[index])

      if(index !== value.length - 1) {
        searchedValues[lastIdx].push(value[index + 1])
      }
    }
  })

  return searchedValues;
}