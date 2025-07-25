const API_URL = "http://localhost:3001";

export async function getMessages() {
  const response = await fetch(`${API_URL}/users/messages`);
  return response;
}

export async function postMessage(formData) {
  const response = await fetch(`${API_URL}/users/new-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return response;
}
