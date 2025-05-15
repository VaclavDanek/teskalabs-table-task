export const filterData = (data, params, filter) => (
  !filter ? data : data.filter((item) => (
    params.some((param) => item[param].toLowerCase().includes(filter.trim().toLowerCase()))
  ))
);

export const sortData = (data, sorts) => {
  if (!sorts?.length)
    return;

  const compare = (objectA, objectB, index = 0) => {
    const [param, sortDirection] = sorts[index];
 
    let comparison = 0;
    const valueA = objectA[param.substring(1)];
    const valueB = objectB[param.substring(1)];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      comparison = valueA.localeCompare(valueB, navigator.language, { numeric: true });
    } else if (valueA > valueB) {
      comparison = 1;
    } else if (valueA < valueB) {
      comparison = -1;
    }

    index++
    if (comparison === 0 && sorts.length > index)
      return compare(objectA, objectB, index)

    return sortDirection === 'a' ? comparison : -comparison;
  }
  return data.sort((a, b) => compare(a, b))
}