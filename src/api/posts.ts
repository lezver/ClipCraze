import axios from "axios";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const getPosts = async (
  limit: number = 3,
  start: number = 0,
): Promise<Post[]> => {
  try {
    const { data } = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_start=${start}`,
    );
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};
