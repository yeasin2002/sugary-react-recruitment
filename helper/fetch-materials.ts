import { axiosClient } from "@/lib/axiosClient";
import type { MaterialsResponse } from "@/types";

export async function fetchMaterials(
  skip = 0,
  limit = 20
): Promise<MaterialsResponse> {
  const filter = {
    Skip: skip,
    Limit: limit,
    Types: [1],
  };

  const encodedFilter = btoa(JSON.stringify(filter));

  try {
    const response = await axiosClient.get(`/Materials/GetAll`, {
      params: { filter: encodedFilter },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
}
