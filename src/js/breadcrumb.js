document.addEventListener('DOMContentLoaded', () => {
    const crumb = document.getElementById('breadcrumbs'); // MUST match the HTML id
    if (!crumb) return;
  
    const path = window.location.pathname;
    const params = new URLSearchParams(location.search);
  
    // helpers
    const getCategoryFromParam = () => params.get('category')?.charAt(0).toUpperCase() + params.get('category')?.slice(1) || null;
    const getCategoryFromTitle = () => {
      const h2 = document.querySelector('.product-detail h2');
      if (!h2) return 'Products';

      const text = h2.textContent.toLowerCase();
      const keywords = ['backpack', 'tent', 'hammock', 'sleeping bag'];

      // Look for the first keyword in the h2 text
      const match = keywords.find(word => text.includes(word));

      return match 
        ? match.charAt(0).toUpperCase() + match.slice(1) 
        : 'Products';
    };
    const getCategoryFromList = () =>
      document.querySelector('.product-list')?.dataset?.category || null;
  
    const rememberCategory = (cat) => { if (cat) localStorage.setItem('last-category', cat); };
    const recallCategory = 'Products';
  
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
    if (category) setCrumb(<span>${category}</span>); 
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
      return 'Products';
    }
  
    // Other pages: hide by default
    crumb.style.display = 'none';
  });