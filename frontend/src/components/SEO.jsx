import { useEffect } from 'react';

const SEO = ({ title, description, keywords, canonical }) => {
  useEffect(() => {
    // Title
    if (title) {
      document.title = `${title} | Paras Healthcare`;
    } else {
      document.title = 'Paras Healthcare | Home ICU & Nursing Services in Jaipur';
    }

    // Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description || 'Paras Healthcare brings hospital-grade clinical care, home ICU setup, professional nursing, physiotherapy, and medical equipment rental directly to your home in Malviya Nagar, Jaipur.');

    // Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords || 'home healthcare jaipur, home icu setup jaipur, home nursing services jaipur, physiotherapy at home jaipur, medical equipment rental jaipur, paras healthcare, paras medical store, malviya nagar jaipur');

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical || window.location.href);

  }, [title, description, keywords, canonical]);

  return null;
};

export default SEO;
