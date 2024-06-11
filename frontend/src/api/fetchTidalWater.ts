import { useQuery } from "react-query";

async function fetchTidalWater(harborName: string) {
  const response = await fetch(`/api/tidalwater/${harborName}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export const useTidalWater = (harborName: string) =>
  useQuery(["tidalWater", harborName], () => fetchTidalWater(harborName));
