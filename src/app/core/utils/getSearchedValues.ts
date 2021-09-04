import { SearchedValues } from "../interfaces/searched-values";

export const getSearchedValues = (value: string[], searchString: string) => {
  const searchedValues: SearchedValues = {values: []};

  value.forEach((eachString, index) => {
    if(eachString.includes(searchString)) {
      searchedValues.values.push([]);
      const lastIdx = searchedValues.values.length - 1; 
      if(index !== 0) {
        searchedValues.values[lastIdx].push({
          text: value[index - 1],
          lineNumber: index - 1
        })
      }

      searchedValues.values[lastIdx].push({
        text: value[index],
        lineNumber: index
      })

      if(index !== value.length - 1) {
        searchedValues.values[lastIdx].push({
          text: value[index + 1],
          lineNumber: index + 1
        })
      }
    }
  })

  return searchedValues;
}