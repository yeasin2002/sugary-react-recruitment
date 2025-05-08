import type { MaterialsResponse } from "@/types";

const API_BASE_URL = "https://sugarytestapi.azurewebsites.net";
const IMAGE_BASE_URL = "https://d1wh1xji6f82aw.cloudfront.net";

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

  // In a real application, you would store and retrieve the token securely
  // For this example, we'll use a placeholder token
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (!token) {
    console.warn(
      "API token not found. Make sure NEXT_PUBLIC_API_TOKEN is set in your environment variables."
    );
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/Materials/GetAll/?filter=${encodedFilter}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
}

export function getImageUrl(path: string): string {
  return `${IMAGE_BASE_URL}/${path}`;
}
