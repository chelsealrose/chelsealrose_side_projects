export const LOCAL_CLIENTS_KEY = 'client_list';

export const getClients = () => {
  const raw = localStorage.getItem(LOCAL_CLIENTS_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveClients = (clients) => {
  localStorage.setItem(LOCAL_CLIENTS_KEY, JSON.stringify(clients));
};

