import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: baseUrl,
  // withCredentials: true
});

export const getData = async (path: string) => {
  const res = await instance.get(path);
  console.log(res.headers);
  return (await instance.get(path)).data;
};
