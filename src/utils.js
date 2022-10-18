import { data } from "./data";

export const getSuggestions = (keyword) => {
  const result = data.filter((item) => {
    return (
      item.substr(0, keyword.length).toLowerCase() === keyword.toLowerCase()
    );
  });

  console.log(result);

  return new Promise((res) => {
    setTimeout(() => {
      return res(result);
    }, 1000);
  });
};
