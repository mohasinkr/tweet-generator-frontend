/**
 * API service for tweet generation
 */

/**
 * Fetches a tweet from the API based on the selected category
 * @param category - The category to generate a tweet for
 * @returns Promise with the generated tweet
 */
export const fetchTweetFromAPI = async (category: string): Promise<string> => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.tweet || "No tweet was generated";
  } catch (err) {
    console.error("Error fetching tweet:", err);
    throw err;
  }
};
