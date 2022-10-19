import "./styles.css";
import { getSuggestions } from "./utils";

const inputBox = document.getElementById("search-box");
const suggestionContainer = document.getElementById("suggest-wrapper");

const resetState = () => {
  suggestionContainer.classList.remove("suggest-visible");
};

const renderDropDown = (list) => {
  const suggestFragment = document.createDocumentFragment();

  list.forEach((item) => {
    const el = document.createElement("div");
    el.innerHTML = item;
    el.setAttribute("data-key", item);
    suggestFragment.appendChild(el);
  });
  suggestionContainer.innerHTML = "";
  suggestionContainer.appendChild(suggestFragment);
};

const getItems = async (value) => {
  const result = await getSuggestions(value);
  console.log(result);
  if (result.length) {
    suggestionContainer.classList.add("suggest-visible");
    renderDropDown(result);
  }
};

const handleChange = (event) => {
  console.log(event.target.value);
  const value = event.target.value;
  if (value) {
    getItems(value);
  } else {
    resetState();
  }
};

const handleSelect = (event) => {
  const { key } = event.target.dataset;
  console.log(key, event.target);
  if (key) {
    inputBox.value = key;
    resetState();
  } else {
    resetState();
  }
};
(() => {
  inputBox.addEventListener("input", handleChange);
  suggestionContainer.addEventListener("click", handleSelect);
})();
