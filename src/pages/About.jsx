import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Target,
  Zap,
  Users,
  RotateCw,
  ArrowLeft,
  Camera,
  Layers,
  BookOpen,
  ChevronLeft
} from 'lucide-react';
import data from '../data/adasa.json';

export default function About() {
  const siteInfo = data.siteInfo || {};
  const posts = Array.isArray(data.posts) ? data.posts : [];

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

  const values = [
    {
      icon: Target,
      title: 'الجودة أولاً',
      description: 'محتوى تعليمي مدروس ومكتوب بأيدي مصورين متمرسين لضمان الفائدة القصوى.',
    },
    {
      icon: Zap,
      title: 'تركيز عملي',
      description: 'نصائح وأمثلة تطبيقية واقعية مع إعدادات الكاميرا والعدسات خطوة بخطوة.',
    },
    {
      icon: Users,
      title: 'مجتمع شغوف',
      description: 'بيئة معرفية عربية تجمع المصورين الهواة والمحترفين لتبادل الخبرات والتجارب.',
    },
    {
      icon: RotateCw,
      title: 'دائماً محدث',
      description: 'متابعة مستمرة لأحدث تقنيات التصوير، مراجعات المعدات، وأساليب المعالجة الرقمية.',
    },
  ];

  return (
    <div className="about-page">
      <section className="about-hero-section">
        <div className="hero-grid-pattern"></div>
        <div className="ambient-orange-glow"></div>

        <div className="container about-hero-container">
          <div className="section-pill-badge">
            <span className="pulse-dot">
              <span className="pulse-ring"></span>
              <span className="pulse-core"></span>
            </span>
            <span>من نحن</span>
          </div>

          <h1 className="about-hero-title">
            مهمتنا هي <span className="text-gradient-orange">الإعلام والإلهام</span>
          </h1>

          <p className="about-hero-description">
            {siteInfo.description ||
              'عدسة هي مدونة متخصصة في فن التصوير الفوتوغرافي، نكرس جهودنا لمساعدة عشاق الكاميرا في تطوير مهاراتهم واستكشاف أحدث التقنيات وأسرار المحترفين.'}
          </p>

          <div className="about-stats-grid">
            <div className="glass-stat-card">
              <BookOpen size={24} className="stat-card-icon" />
              <div className="stat-card-val">{posts.length}</div>
              <div className="stat-card-lbl">مقالة منشورة</div>
            </div>

            <div className="glass-stat-card">
              <Users size={24} className="stat-card-icon" />
              <div className="stat-card-val">+10 آلاف</div>
              <div className="stat-card-lbl">قارئ شهرياً</div>
            </div>

            <div className="glass-stat-card">
              <Layers size={24} className="stat-card-icon" />
              <div className="stat-card-val">{categories.length}</div>
              <div className="stat-card-lbl">تصنيفات متخصصة</div>
            </div>

            <div className="glass-stat-card">
              <Camera size={24} className="stat-card-icon" />
              <div className="stat-card-val">28</div>
              <div className="stat-card-lbl">كاتباً ومصوراً</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values-section">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-pill-badge mb-3">
              <Sparkles size={14} className="text-orange-500" />
              <span>مبادئنا</span>
            </div>
            <h2 className="section-h2">قيمنا الأساسية</h2>
            <p className="section-subtext">
              المبادئ التي ننطلق منها في صياغة مقالاتنا وتوجيه محتوانا لكل مبدع.
            </p>
          </div>

          <div className="values-grid">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="value-card">
                  <div className="value-icon-box">
                    <Icon size={24} />
                  </div>
                  <h3 className="value-title">{val.title}</h3>
                  <p className="value-desc">{val.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-categories-section">
        <div className="container">
          <div className="section-header-centered">
            <div className="section-pill-badge mb-3">
              <Layers size={14} className="text-orange-500" />
              <span>المحتوى</span>
            </div>
            <h2 className="section-h2">ماذا يمكنك أن تستكشف في عدسة؟</h2>
            <p className="section-subtext">
              نغطي مجالات التصوير الأكثر أهمية لتجد كل ما يلهمك ويطور أدواتك.
            </p>
          </div>

          <div className="about-topics-grid">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/blog?category=${encodeURIComponent(cat.name)}`}
                className="about-topic-card"
              >
                <div className="topic-header">
                  <span className="topic-badge">{cat.count} مقالات</span>
                  <Camera size={20} className="text-orange-500" />
                </div>
                <h3 className="topic-name">{cat.name}</h3>
                <p className="topic-summary">
                  استكشف المقالات والدروس المتخصصة في مجال {cat.name}.
                </p>
                <div className="topic-link">
                  <span>تصفح المقالات</span>
                  <ChevronLeft size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="container">
          <div className="about-cta-card">
            <div className="cta-ambient-glow"></div>
            <h2 className="cta-headline">هل أنت مستعد لتطوير عينك الفوتوغرافية؟</h2>
            <p className="cta-sub">
              انضم إلى آلاف القراء واستكشف مكتبتنا المجانية من المقالات والأسرار الاحترافية.
            </p>
            <div className="cta-actions">
              <Link to="/blog" className="header-cta-btn cta-large">
                <span>ابدأ القراءة الآن</span>
                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
