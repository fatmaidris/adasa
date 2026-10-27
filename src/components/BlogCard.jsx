import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Camera, User } from 'lucide-react';

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

export default function BlogCard({ post, viewMode = 'grid', featured = false }) {
  const [imgError, setImgError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  if (!post) return null;

  const {
    id,
    slug,
    title,
    excerpt,
    category,
    author,
    image,
    date,
    readTime,
    tags,
  } = post;

  const postUrl = `/blog/${slug || id}`;
  const formattedDate = formatDate(date);

  return (
    <article
      className={`dark-editorial-card ${
        viewMode === 'list' ? 'card-list-layout' : 'card-grid-layout'
      } ${featured ? 'card-featured' : ''}`}
    >
      <div className="card-media-wrapper">
        <Link to={postUrl} tabIndex={-1} aria-hidden="true" className="card-media-link">
          {imgError || !image ? (
            <div className="card-fallback-media">
              <Camera size={32} strokeWidth={1.5} />
              <span>عدسة</span>
            </div>
          ) : (
            <img
              src={image}
              alt={title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="card-media-img"
            />
          )}
        </Link>

        <span className="card-category-chip">{category}</span>

        {featured && <span className="card-featured-tag">⭐ مميز</span>}
      </div>

      <div className="card-body-content">
        <div className="card-meta-bar">
          <span className="meta-info-item">
            <Calendar size={13} />
            <time dateTime={date}>{formattedDate}</time>
          </span>
          <span className="meta-separator">•</span>
          <span className="meta-info-item">
            <Clock size={13} />
            <span>{readTime}</span>
          </span>
        </div>

        <h3 className="card-headline">
          <Link to={postUrl} className="headline-link">
            {title}
          </Link>
        </h3>

        <p className="card-summary">{excerpt}</p>

        {Array.isArray(tags) && tags.length > 0 && (
          <div className="card-tag-chips">
            {tags.slice(0, 3).map((tag, idx) => (
              <span key={`${id}-t-${idx}`} className="tag-chip-item">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="card-bottom-bar">
          <div className="author-cell">
            {avatarError || !author?.avatar ? (
              <div className="author-fallback-circle">
                <User size={15} />
              </div>
            ) : (
              <img
                src={author.avatar}
                alt={author.name}
                loading="lazy"
                onError={() => setAvatarError(true)}
                className="author-avatar-img"
              />
            )}
            <div className="author-text-meta">
              <span className="author-name-text">{author?.name}</span>
              <span className="author-role-text">{author?.role}</span>
            </div>
          </div>

          <Link to={postUrl} className="card-read-action" aria-label={`اقرأ مقال: ${title}`}>
            <span>اقرأ المقال</span>
            <ArrowLeft size={15} className="read-arrow" />
          </Link>
        </div>
      </div>
    </article>
  );
}
