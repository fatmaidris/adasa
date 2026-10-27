import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowLeft,
  Info,
  BookOpen,
  Users,
  Layers,
  Camera,
  Award,
  ChevronLeft
} from 'lucide-react';
import BlogCard from '../components/BlogCard.jsx';
import data from '../data/adasa.json';

export default function Home() {
  const siteInfo = data.siteInfo || {};
  const posts = Array.isArray(data.posts) ? data.posts : [];

  const featuredPosts = posts.filter((p) => p.featured === true);
  const latestPosts = posts.filter((p) => !p.featured).slice(0, 3);

  const categoryCounts = {};
  posts.forEach((p) => {
    if (p.category) {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    }
  });

  const categories = Object.keys(categoryCounts).map((catName) => ({
    name: catName,
    count: categoryCounts[catName],
  }));

  return (
    <div className="home-page">
      <section className="home-hero-section">
        <div className="hero-grid-pattern"></div>
        <div className="ambient-orange-glow"></div>

        <div className="container home-hero-container">
          <div className="section-pill-badge">
            <span className="pulse-dot">
              <span className="pulse-ring"></span>
              <span className="pulse-core"></span>
            </span>
            <span>مرحباً بك في {siteInfo.name || 'عدسة'}</span>
          </div>

          <h1 className="hero-main-title">
            اكتشف <span className="text-gradient-orange">فن</span>
            <br />
            التصوير الفوتوغرافي
          </h1>

          <p className="hero-supporting-text">
            انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.
          </p>

          <div className="hero-buttons-group">
            <Link to="/blog" className="header-cta-btn cta-large">
              <span>استكشف المقالات</span>
              <ArrowLeft size={18} className="cta-arrow" />
            </Link>

            <Link to="/about" className="secondary-dark-btn">
              <Info size={18} />
              <span>اعرف المزيد</span>
            </Link>
          </div>

          <div className="hero-stats-grid">
            <div className="glass-stat-card">
              <BookOpen size={22} className="stat-card-icon" />
              <div className="stat-card-val">{posts.length}</div>
              <div className="stat-card-lbl">مقالة منشورة</div>
            </div>

            <div className="glass-stat-card">
              <Users size={22} className="stat-card-icon" />
              <div className="stat-card-val">+10 آلاف</div>
              <div className="stat-card-lbl">قارئ شهرياً</div>
            </div>

            <div className="glass-stat-card">
              <Layers size={22} className="stat-card-icon" />
              <div className="stat-card-val">{categories.length}</div>
              <div className="stat-card-lbl">تصنيفات متخصصة</div>
            </div>

            <div className="glass-stat-card">
              <Camera size={22} className="stat-card-icon" />
              <div className="stat-card-val">28</div>
              <div className="stat-card-lbl">كاتباً ومصوراً</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark featured-articles-section">
        <div className="container">
          <div className="section-title-bar">
            <div>
              <div className="section-tag-inline">
                <Award size={16} />
                <span>مختارات المحررين</span>
              </div>
              <h2 className="section-heading-dark">المقالات المميزة</h2>
            </div>

            <Link to="/blog" className="section-view-all-link">
              <span>تصفح كل المقالات</span>
              <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="cards-grid-3">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} viewMode="grid" featured={true} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark-alt categories-section">
        <div className="container">
          <div className="section-title-bar">
            <div>
              <div className="section-tag-inline">
                <Layers size={16} />
                <span>محاور التصوير</span>
              </div>
              <h2 className="section-heading-dark">استكشف حسب التصنيف</h2>
            </div>
          </div>

          <div className="categories-card-grid">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="category-box-card"
              >
                <div className="cat-box-header">
                  <h3 className="cat-box-title">{cat.name}</h3>
                  <span className="cat-box-count">{cat.count} مقالات</span>
                </div>
                <p className="cat-box-desc">
                  دروس وشروحات احترافية لتنمية مهاراتك الفنية في تصوير {cat.name}.
                </p>
                <div className="cat-box-action">
                  <span>تصفح المقالات</span>
                  <ChevronLeft size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark latest-articles-section">
        <div className="container">
          <div className="section-title-bar">
            <div>
              <div className="section-tag-inline">
                <Sparkles size={16} />
                <span>أحدث الإضافات</span>
              </div>
              <h2 className="section-heading-dark">أحدث ما نُشر</h2>
            </div>

            <Link to="/blog" className="section-view-all-link">
              <span>عرض جميع المقالات ({posts.length})</span>
              <ArrowLeft size={16} />
            </Link>
          </div>

          <div className="cards-grid-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} viewMode="grid" />
            ))}
          </div>

          <div className="section-center-cta">
            <Link to="/blog" className="header-cta-btn cta-large">
              <span>استكشف المدونة الكاملة ({posts.length} مقال)</span>
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
