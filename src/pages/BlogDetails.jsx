import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  Check,
  Tag,
  BookOpen,
  Camera,
  ChevronLeft,
  AlertCircle,
  Home,
  User,
  Sparkles
} from 'lucide-react';
import BlogCard from '../components/BlogCard.jsx';
import data from '../data/adasa.json';

const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const month = ARABIC_MONTHS[parseInt(parts[1], 10) - 1] || parts[1];
  const day = parseInt(parts[2], 10);
  return `${day} ${month} ${year}`;
}

function parseContent(content) {
  if (!content) return [];
  const blocks = content.split(/\n\n+/);
  return blocks
    .map((b) => b.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith('## ')) {
        return { type: 'heading', text: block.replace(/^##\s+/, '') };
      }
      return { type: 'paragraph', text: block };
    });
}

export default function BlogDetails() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [coverError, setCoverError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCoverError(false);
    setAvatarError(false);
  }, [id]);

  const allPosts = Array.isArray(data.posts) ? data.posts : [];

  const post = allPosts.find((p) => p.slug === id || String(p.id) === String(id));

  if (!post) {
    return (
      <div className="section-dark article-not-found-screen">
        <div className="container text-center py-20">
          <div className="not-found-icon-wrap mb-4">
            <AlertCircle size={48} className="text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">المقال غير موجود</h1>
          <p className="text-neutral-400 mb-8 max-w-md mx-auto">
            عذراً، لم نتمكن من العثور على المقال المطلوب. ربما تم نقله أو تغيّر رابطه.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/blog" className="header-cta-btn">
              <BookOpen size={16} />
              <span>العودة إلى المدونة</span>
            </Link>
            <Link to="/" className="secondary-dark-btn">
              <span>الصفحة الرئيسية</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const {
    title,
    excerpt,
    content,
    category,
    author,
    image,
    date,
    readTime,
    tags,
  } = post;

  const formattedDate = formatDate(date);
  const contentBlocks = parseContent(content);

  let relatedPosts = allPosts
    .filter((p) => p.category === category && p.id !== post.id)
    .slice(0, 3);

  if (relatedPosts.length < 3) {
    const extra = allPosts.filter((p) => p.id !== post.id && !relatedPosts.some((r) => r.id === p.id)).slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...extra];
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <article className="article-details-page-dark">
      <div className="details-hero-banner">
        {!coverError && image ? (
          <img
            src={image}
            alt={title}
            onError={() => setCoverError(true)}
            className="details-hero-image"
          />
        ) : (
          <div className="details-hero-fallback">
            <Camera size={64} strokeWidth={1.2} />
          </div>
        )}

        <div className="details-hero-gradient-bottom"></div>
        <div className="details-hero-gradient-side"></div>

        <div className="details-breadcrumb-float">
          <nav className="frosted-breadcrumb" aria-label="مسار المقال">
            <Link to="/" className="breadcrumb-nav-link" title="الرئيسية">
              <Home size={15} />
            </Link>
            <ChevronLeft size={13} className="text-white/40" />
            <Link to="/blog" className="breadcrumb-nav-link">
              المدونة
            </Link>
            <ChevronLeft size={13} className="text-white/40" />
            <span className="breadcrumb-cat-badge">{category}</span>
          </nav>
        </div>

        <div className="details-hero-content-box">
          <div className="container max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Link
                to={`/blog?category=${encodeURIComponent(category)}`}
                className="details-cat-tag"
              >
                {category}
              </Link>
              <span className="details-meta-item">
                <Calendar size={14} />
                <time dateTime={date}>{formattedDate}</time>
              </span>
              <span className="text-white/30">•</span>
              <span className="details-meta-item">
                <Clock size={14} />
                <span>{readTime}</span>
              </span>
            </div>

            <h1 className="details-hero-heading">{title}</h1>
          </div>
        </div>
      </div>

      <div className="details-body-wrapper">
        <div className="container max-w-4xl">
          <div className="details-toolbar-row">
            <Link to="/blog" className="back-blog-action">
              <ArrowRight size={17} />
              <span>العودة إلى المدونة</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className={`details-share-button ${copied ? 'copied' : ''}`}
              title="مشاركة المقال"
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              <span>{copied ? 'تم نسخ الرابط!' : 'مشاركة'}</span>
            </button>
          </div>

          <div className="details-lead-excerpt">
            <p>{excerpt}</p>
          </div>

          <div className="details-author-card">
            <div className="author-photo-group">
              {avatarError || !author?.avatar ? (
                <div className="author-large-fallback">
                  <User size={22} />
                </div>
              ) : (
                <img
                  src={author.avatar}
                  alt={author.name}
                  onError={() => setAvatarError(true)}
                  className="author-large-avatar"
                />
              )}
              <div>
                <span className="author-label-small">بقلم المصور:</span>
                <h4 className="author-name-large">{author?.name}</h4>
                <span className="author-role-badge">{author?.role}</span>
              </div>
            </div>
          </div>

          <div className="details-editorial-text">
            {contentBlocks.map((block, idx) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={`h2-${idx}`} className="details-h2">
                    <span className="h2-accent-bar"></span>
                    <span>{block.text}</span>
                  </h2>
                );
              }
              return (
                <p key={`p-${idx}`} className="details-p">
                  {block.text}
                </p>
              );
            })}
          </div>

          {Array.isArray(tags) && tags.length > 0 && (
            <div className="details-tags-row">
              <div className="tags-label-group">
                <Tag size={16} className="text-orange-500" />
                <span>الوسوم:</span>
              </div>
              <div className="tags-badges-list">
                {tags.map((tag, idx) => (
                  <span key={`tg-${idx}`} className="dark-tag-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section className="details-related-section">
          <div className="container">
            <div className="section-title-bar">
              <div>
                <div className="section-tag-inline">
                  <Sparkles size={16} />
                  <span>مقالات قد تهمك</span>
                </div>
                <h2 className="section-heading-dark">المزيد في تصنيف "{category}"</h2>
              </div>

              <Link
                to={`/blog?category=${encodeURIComponent(category)}`}
                className="section-view-all-link"
              >
                <span>عرض الكل</span>
                <ChevronLeft size={16} />
              </Link>
            </div>

            <div className="cards-grid-3">
              {relatedPosts.map((related) => (
                <BlogCard key={related.id} post={related} viewMode="grid" />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
