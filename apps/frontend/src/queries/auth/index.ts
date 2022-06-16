import axios from "axios";

export const auth = async () => {
  const res = await axios.post<{ accessToken: string }>("/auth");
  return res.data;
};
