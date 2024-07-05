export const handleFilter = (data, key, value, Num) => {
    switch (Num) {
      case 'Numbers':
        return data.filter((item) => item[key] >= value.From && item[key] <= value.To);
      default:
        return data.filter((item) => item[key] === value);
    }
  };