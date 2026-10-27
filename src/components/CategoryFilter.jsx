import React from 'react';

export default function CategoryFilter({
  categories = [],
  selectedCategory = 'all',
  totalCount = 0,
  onSelectCategory,
}) {
  return (
    <div className="category-buttons-row" role="group" aria-label="تصفية المقالات حسب التصنيف">
      <button
        type="button"
        onClick={() => onSelectCategory('all')}
        className={`category-filter-btn ${selectedCategory === 'all' || selectedCategory === 'الكل' ? 'active' : ''}`}
        aria-pressed={selectedCategory === 'all' || selectedCategory === 'الكل'}
      >
        <span>الكل</span>
        <span className="cat-btn-count">({totalCount})</span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat.name}
          type="button"
          onClick={() => onSelectCategory(cat.name)}
          className={`category-filter-btn ${selectedCategory === cat.name ? 'active' : ''}`}
          aria-pressed={selectedCategory === cat.name}
        >
          <span>{cat.name}</span>
          <span className="cat-btn-count">({cat.count})</span>
        </button>
      ))}
    </div>
  );
}
