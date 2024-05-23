import API_URL from "../../assets/js/api";

export const fetchMockBackendData = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching mock backend data:", error);
    return null;
  }
};
