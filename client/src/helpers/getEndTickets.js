export const getEndTickets = async () => {
  const resp = await fetch("http://localhost:8080/ultimos");
  const data = await resp.json();
  
  return data.ultimos;
};
