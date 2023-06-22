import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

type Character = {
  id: number;
  name: string;
  image: string;
};

const PAGE_SIZE = 20; // Number of characters to fetch per page

const fetchCharacters = async (page: number): Promise<Character[]> => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const characters = response.data.results;
    return characters;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
};

const ImageFeed = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadCharacters = async (page: number) => {
    setIsLoading(true);
    const fetchedCharacters = await fetchCharacters(page);
    setIsLoading(false);
    setCharacters(fetchedCharacters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchTotalPages = async () => {
      try {
        const response = await axios.get(
          'https://rickandmortyapi.com/api/character'
        );
        const totalCharacters = response.data.info.count;
        const totalPages = Math.ceil(totalCharacters / PAGE_SIZE);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching total pages:', error);
      }
    };

    fetchTotalPages();
  }, []);

  useEffect(() => {
    loadCharacters(currentPage);
  }, [currentPage]);

  return (
    <div>
      <h1>Rick and Morty Character Image Feed</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {characters.map((character) => (
            <div key={character.id}>
              <h3>{character.name}</h3>
              <img src={character.image} alt={character.name} />
            </div>
          ))}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ImageFeed;
