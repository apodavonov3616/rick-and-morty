import { useEffect, useState } from 'react';
import { fetchCharacters, Character } from '../../api/api';
import Pagination from './../Pagination/Pagination';
import styles from './ImageFeed.module.css';

const ImageFeed = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCharactersByPage = async () => {
      try {
        const response = await fetchCharacters(currentPage);
        setCharacters(response.results);
        setTotalPages(response.info.pages);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharactersByPage();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className={styles.header}>Rick and Morty Paginator </h1>
      <div className={`${styles.characterGrid} ${styles.spaceBottom}`}>
  {characters &&
    characters.map((character) => (
      <div key={character.id} className={styles.characterItem}>
        <h3>{character.name}</h3>
        <img className={styles.img}src={character.image} alt={`image of ${character.name}`} />
      </div>
    ))}
</div>
<div className={styles.paginationContainer}>
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  />
</div>
    </div>
  );
};

export default ImageFeed;