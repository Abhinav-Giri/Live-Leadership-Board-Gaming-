import axios from "axios";

const API_BASE = "http://localhost:5000/leaderboard";

export const seedPlayers = async () => {
  await axios.post(`${API_BASE}/update`, {
    user_id: "jack",
    delta: 500,
  });

  await axios.post(`${API_BASE}/update`, {
    user_id: "jill",
    delta: 50,
  });

  await axios.post(`${API_BASE}/update`, {
    user_id: "smith",
    delta: 750,
  });
};

export const fetchTopPlayers = async (k) => {
  const response = await axios.get(`${API_BASE}/top/${k}`);
  console.log("Fetched top players:", response.data);
  return response.data;
};