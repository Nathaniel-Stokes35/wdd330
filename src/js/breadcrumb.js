document.addEventListener('DOMContentLoaded', () => {
    const crumb = document.getElementById('breadcrumbs'); // MUST match the HTML id
    if (!crumb) return;
  
    const path = window.location.pathname;
    const params = new URLSearchParams(location.search);
  
    // Root home only
    const isHome = /^(?:\/|\/index\.html)$/.test(path);
  
    if (isHome) {
      crumb.style.display = 'none';
      return;
    }
  
    // helpers
    const getCategoryFromParam = () => params.get('category');
    const getCategoryFromTitle = () => {
      const h2 = document.querySelector('.products h2');
      if (!h2) return null;
      // If you updated the title like "Top Products: Tents"
      const m = h2.textContent.match(/Top Products:\s*(.+)/i);
      return (m && m[1]) || h2.dataset.category || null;
    };
    const getCategoryFromList = () =>
      document.querySelector('.product-list')?.dataset?.category || null;
  
    const rememberCategory = (cat) => { if (cat) localStorage.setItem('last-category', cat); };
    const recallCategory = () => localStorage.getItem('last-category');
  
    const setCrumb = (html) => {
      crumb.innerHTML = `<a href="/index.html">Home</a> &gt; ${html}`;
      crumb.style.display = '';
    };
  
    const isDetail = path.includes('/product_pages/');
    const isList = !!document.querySelector('.product-list');
  
    if (isDetail) {
      // product detail: show "Category"
      const category =
        getCategoryFromParam() ||
        recallCategory() ||
        getCategoryFromTitle() ||
        getCategoryFromList();

     if (category) setCrumb(`<span>${toTitle(category)}</span>`);
     else crumb.style.display = 'none';
     return;
    }
  
    if (isList) {
      // product list: "Category -> (N items)"
      const listEl = document.querySelector('.product-list');
  
      const update = () => {
        const category =
          getCategoryFromParam() ||
          getCategoryFromTitle() ||
          getCategoryFromList() ||
          'Products';
  
        rememberCategory(category);
  
        const count = listEl.querySelectorAll('.product-card').length;
        setCrumb(`<span>${category}</span> &gt; <span>(${count} items)</span>`);
      };
  
      // Products may render async; observe for when cards appear
      const observer = new MutationObserver(update);
      observer.observe(listEl, { childList: true });
  
      update(); // initial
      return;
    }
  
    // Other pages: hide by default
    crumb.style.display = 'none';
  });