import toast from "react-hot-toast";

export const handleFilter = (data, key, value, Num) => {
  console.log(value,"asdjhaj")
  if(Num=='Numbers'||Num=='Calender'){
    if (!value.From || !value.To) {
      toast.error("Value is missing required properties.");
      return data;
    }
  }
 

  switch (Num) {
    case 'Numbers':
      return data.filter((item) => item[key] >= value.From && item[key] <= value.To);
    case 'Calender':
      return data.filter((item) => {
        const itemDate = new Date(item.updatedAt);
        const fromDate = new Date(value.From);
        const toDate = new Date(value.To);
        return itemDate >= fromDate && itemDate <= toDate; 
      });
    default:
      return data.filter((item) => item[key] === value);
  }
};