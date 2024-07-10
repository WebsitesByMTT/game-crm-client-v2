import toast from "react-hot-toast";

export const handleFilter = (data, key, value, Num) => {
  console.log(value, Num, "asdjhaj");

  if (Num === 'Numbers' || Num === 'Calender') {
    if (value?.From === '' || value?.To === '') {
      toast.error("Value is missing required properties.");
      return data;
    }
  }

  let filteredData;

  switch (Num) {
    case 'Numbers':
      filteredData = data.filter((item) => item[key] >= value.From && item[key] <= value.To);
      break;
    case 'Calender':
      filteredData = data.filter((item) => {
        const itemDate = new Date(item.updatedAt);
        const fromDate = new Date(value.From);
        const toDate = new Date(value.To);
        return itemDate >= fromDate && itemDate <= toDate;
      });
      break;
    default:
      filteredData = data.filter((item) => item[key] === value);
      break;
  }

  return filteredData;
};