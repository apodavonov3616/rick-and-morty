import axios from 'axios';

export interface Character {
  id: number;
  name: string;
  image: string;
}

export const fetchCharacters = async (page: number): Promise<any> => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};