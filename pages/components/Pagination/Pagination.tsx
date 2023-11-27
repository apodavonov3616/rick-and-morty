import React from 'react';
import styles from './Pagination.module.css'

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
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
      <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous PagehandlePrevPage
      </button>
      <span>
        &nbsp;Page {currentPage} of {totalPages}&nbsp;
      </span>
      <button className={styles.paginationButton} onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
