import axios from "axios";

const API_BASE = "http://localhost:5000/leaderboard";

export const updateScoreAPI = (user_id, delta) =>
  axios.post(`${API_BASE}/update`, { user_id, delta });

export const getTopKAPI = (k) =>
  axios.get(`${API_BASE}/top/${k}`);

export const getRankAPI = (user_id) =>
  axios.get(`${API_BASE}/rank/${user_id}`);

export const getRangeAPI = (start, end) =>
  axios.get(`${API_BASE}/range?start=${start}&end=${end}`);