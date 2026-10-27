import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = 'ابحث في المقالات بالعنوان، الكاتب، المحتوى...'
}) {
  return (
    <div className="dark-search-bar">
      <label htmlFor="blog-search" className="sr-only">
        البحث في المقالات
      </label>
      <div className="search-field-frame">
        <Search size={18} className="search-field-icon" aria-hidden="true" />
        <input
          id="blog-search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-field-input"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="search-clear-btn"
            aria-label="مسح البحث"
            title="مسح البحث"
          >
            <X size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

