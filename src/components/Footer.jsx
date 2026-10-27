import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mail, ArrowUp } from 'lucide-react';
import { TwitterIcon, GithubIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons.jsx';
import data from '../data/adasa.json';

export default function Footer() {
  const siteInfo = data.siteInfo || {};
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="dark-site-footer">
      <div className="container footer-content-wrap">
        <div className="footer-columns-grid">
          <div className="footer-brand-column">
            <Link to="/" className="brand-group" onClick={scrollToTop}>
              <div className="brand-logo-frame">
                <Camera size={20} strokeWidth={2.2} />
              </div>
              <div className="brand-names">
                <span className="brand-title">{siteInfo.name || 'عدسة'}</span>
                <span className="brand-subtitle">{siteInfo.tagline || 'عالم التصوير الفوتوغرافي'}</span>
              </div>
            </Link>
            <p className="footer-lead-text">
              {siteInfo.description ||
                'مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين ونصائح عملية لتطوير مهاراتكم.'}
            </p>
          </div>

          <div className="footer-nav-column">
            <h4 className="footer-heading">روابط الموقع</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/" onClick={scrollToTop}>الرئيسية</Link>
              </li>
              <li>
                <Link to="/blog" onClick={scrollToTop}>المدونة (جميع المقالات)</Link>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop}>من نحن</Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact-column">
            <h4 className="footer-heading">تواصل معنا</h4>
            {siteInfo.email && (
              <a href={`mailto:${siteInfo.email}`} className="footer-mail-link">
                <Mail size={16} className="text-orange-500" />
                <span>{siteInfo.email}</span>
              </a>
            )}

            <div className="footer-social-row">
              {siteInfo.social?.twitter && (
                <a
                  href={siteInfo.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-box"
                  title="تويتر / إكس"
                  aria-label="تويتر"
                >
                  <TwitterIcon size={16} />
                </a>
              )}
              {siteInfo.social?.github && (
                <a
                  href={siteInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-box"
                  title="جيت هب"
                  aria-label="جيت هب"
                >
                  <GithubIcon size={16} />
                </a>
              )}
              {siteInfo.social?.linkedin && (
                <a
                  href={siteInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-box"
                  title="لينكد إن"
                  aria-label="لينكد إن"
                >
                  <LinkedinIcon size={16} />
                </a>
              )}
              {siteInfo.social?.youtube && (
                <a
                  href={siteInfo.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-box"
                  title="يوتيوب"
                  aria-label="يوتيوب"
                >
                  <YoutubeIcon size={16} />
                </a>
              )}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="footer-top-btn"
              title="العودة إلى الأعلى"
            >
              <span>العودة للأعلى</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        <div className="footer-copyright-bar">
          <p>
            جميع الحقوق محفوظة &copy; {currentYear} {siteInfo.name} — مدونة فن التصوير الفوتوغرافي
          </p>
        </div>
      </div>
    </footer>
  );
}
