"use server";

import { fetchMaterials } from "@/helper/fetch-materials";

export const fetchMaterialsWithFilter = async (
  skip = 0,
  limit = 20,
  searchValue?: string
) => {
  const response = await fetchMaterials(skip, limit);
  if (!searchValue) return response;

  const filteredMaterials = response.Materials.filter((material) => {
    console.log("material.Title", material.Title);
    return material.Title.toLowerCase().includes(searchValue.toLowerCase());
  });

  return {
    ...response,
    Materials: filteredMaterials,
  };
};
