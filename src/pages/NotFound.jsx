import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Home, BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="dark-404-page">
      <div className="hero-grid-pattern"></div>
      <div className="ambient-orange-glow"></div>

      <div className="container dark-404-container">
        <div className="icon-camera-404">
          <Camera size={52} strokeWidth={1.5} className="text-orange-500" />
        </div>

        <span className="code-404-gradient">404</span>

        <h1 className="title-404">الصفحة المطلوبة غير موجودة</h1>

        <p className="desc-404">
          عذراً، يبدو أنك وصلت إلى رابط غير متاح أو تمت إزالة الصفحة التي تبحث عنها.
        </p>

        <div className="actions-404-row">
          <Link to="/" className="header-cta-btn">
            <Home size={17} />
            <span>الصفحة الرئيسية</span>
          </Link>

          <Link to="/blog" className="secondary-dark-btn">
            <BookOpen size={17} />
            <span>تصفح المدونة (28 مقال)</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

