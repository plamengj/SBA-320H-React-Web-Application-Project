import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  // Calculate which page numbers to show
  const pageNumbers = [];
  const showMax = 5; // Maximum number of page links to show
  
  let startPage = Math.max(1, currentPage - Math.floor(showMax / 2));
  const endPage = Math.min(totalPages, startPage + showMax - 1);
  
  // Adjust startPage if we're near the end
  if (endPage - startPage + 1 < showMax) {
    startPage = Math.max(1, endPage - showMax + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
        className="pagination-btn first"
      >
        First
      </button>
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="pagination-btn prev"
      >
        Previous
      </button>
      
      <div className="page-numbers">
        {startPage > 1 && <span className="page-ellipsis">...</span>}
        
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`pagination-btn number ${currentPage === number ? 'active' : ''}`}
          >
            {number}
          </button>
        ))}
        
        {endPage < totalPages && <span className="page-ellipsis">...</span>}
      </div>
      
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="pagination-btn next"
      >
        Next
      </button>
      <button 
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages}
        className="pagination-btn last"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination; 