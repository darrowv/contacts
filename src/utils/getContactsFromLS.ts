export const getContactsFromLS = () => {
  const data = localStorage.getItem("contacts");
  return data ? JSON.parse(data) : [];
};
