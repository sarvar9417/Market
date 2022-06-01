export const clearInputs = (setCategory, auth) => {
  const inputs = document.getElementsByTagName("input");
  for (const input of inputs) {
    input.value = "";
  }
  setCategory({
    market: auth.market && auth.market._id,
  });
};
