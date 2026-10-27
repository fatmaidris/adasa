import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, RotateCcw, Search } from 'lucide-react';
import BlogCard from '../components/BlogCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import CategoryFilter from '../components/CategoryFilter.jsx';
import ViewToggle from '../components/ViewToggle.jsx';
import Pagination from '../components/Pagination.jsx';
import data from '../data/adasa.json';

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [searchParams] = useSearchParams();
  const topAnchorRef = useRef(null);

  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  const allPosts = Array.isArray(data.posts) ? data.posts : [];

  const categories = useMemo(() => {
    const countsMap = {};
    allPosts.forEach((post) => {
      if (post.category) {
        countsMap[post.category] = (countsMap[post.category] || 0) + 1;
      }
    });

    return Object.keys(countsMap).map((catName) => ({
      name: catName,
      count: countsMap[catName],
    }));
  }, [allPosts]);

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    const urlQ = searchParams.get('q');
    if (urlCategory && urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
      setCurrentPage(1);
    }
    if (urlQ !== null && urlQ !== searchQuery) {
      setSearchQuery(urlQ);
      setCurrentPage(1);
    }
  }, [searchParams]);

  const filteredPosts = useMemo(() => {
    let result = [...allPosts];

    if (selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'الكل') {
      const cleanCat = selectedCategory.trim().toLowerCase();
      result = result.filter(
        (post) => post.category && post.category.trim().toLowerCase() === cleanCat
      );
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((post) => {
        const titleMatch = post.title && post.title.toLowerCase().includes(q);
        const excerptMatch = post.excerpt && post.excerpt.toLowerCase().includes(q);
        const catMatch = post.category && post.category.toLowerCase().includes(q);
        const authorMatch =
          post.author && post.author.name && post.author.name.toLowerCase().includes(q);
        const tagsMatch =
          Array.isArray(post.tags) && post.tags.some((t) => t.toLowerCase().includes(q));

        return titleMatch || excerptMatch || catMatch || authorMatch || tagsMatch;
      });
    }

    return result;
  }, [allPosts, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (topAnchorRef.current) {
      topAnchorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="blog-page-dark">
      <section className="blog-hero-header">
        <div className="hero-grid-pattern"></div>
        <div className="ambient-orange-glow"></div>

        <div className="container blog-hero-inner">
          <div className="section-pill-badge mb-4">
            <BookOpen size={15} />
            <span>مدونتنا</span>
          </div>

          <h1 className="blog-header-title">
            استكشف <span className="text-gradient-orange">مقالاتنا</span>
          </h1>

          <p className="blog-header-sub">
            اكتشف الدروس والرؤى وأفضل الممارسات لتطوير مهاراتك في فن التصوير الفوتوغرافي.
          </p>
        </div>
      </section>

      <div className="blog-sticky-controls-bar" ref={topAnchorRef}>
        <div className="container">
          <div className="controls-stack">
            <div className="controls-top-row">
              <div className="control-search-area">
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onClear={handleClearSearch}
                  placeholder="ابحث بالعنوان، الكاتب، المحتوى، أو الوسوم..."
                />
              </div>

              <div className="control-toggle-area">
                <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
              </div>
            </div>

            <div className="controls-category-row">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                totalCount={allPosts.length}
                onSelectCategory={handleCategoryChange}
              />
            </div>
          </div>

          <div className="results-status-row">
            <div className="status-text-badge">
              <span>
                {selectedCategory && selectedCategory !== 'all' && selectedCategory !== 'الكل'
                  ? `عرض ${filteredPosts.length} مقالات في ${selectedCategory}`
                  : `عرض ${filteredPosts.length} مقالاً`}
              </span>
            </div>

            {(selectedCategory !== 'all' || searchQuery.trim() !== '') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="reset-pill-btn"
                aria-label="مسح الفلاتر"
              >
                <RotateCcw size={13} />
                <span>مسح الفلاتر</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="blog-posts-section">
        <div className="container">
          {currentPosts.length > 0 ? (
            <>
              <div className={viewMode === 'grid' ? 'cards-grid-3' : 'cards-list-layout'}>
                {currentPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="dark-empty-card">
              <div className="empty-icon-circle">
                <Search size={40} strokeWidth={1.5} />
              </div>
              <h3 className="empty-main-heading">لم نجد أي مقالات مطابقة</h3>
              <p className="empty-subtext">
                جرب البحث بكلمات مفتاحية أخرى أو اختر "الكل" لإعادة إظهار المقالات.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="header-cta-btn"
                aria-label="مسح الفلاتر"
              >
                <RotateCcw size={16} />
                <span>مسح الفلاتر</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
