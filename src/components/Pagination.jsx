import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav className="dark-pagination-nav" aria-label="ترقيم الصفحات">
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="pagination-arrow-btn"
        aria-label="الصفحة السابقة"
      >
        <ChevronRight size={18} />
        <span>السابق</span>
      </button>

      <div className="pagination-numbers-row">
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`pagination-num-btn ${currentPage === pageNum ? 'active' : ''}`}
            aria-current={currentPage === pageNum ? 'page' : undefined}
            aria-label={`الصفحة ${pageNum}`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="pagination-arrow-btn"
        aria-label="الصفحة التالية"
      >
        <span>التالي</span>
        <ChevronLeft size={18} />
      </button>
    </nav>
  );
}
