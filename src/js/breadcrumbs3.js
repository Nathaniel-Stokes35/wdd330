document.addEventListener('DOMContentLoaded', () => {
    const breadcrumbContainer = document.getElementById('breadcrumbs');
    if (!breadcrumbContainer) return;
  
    const fullPath = window.location.pathname;
    const filename = fullPath.substring(fullPath.lastIndexOf('/') + 1);
  
    if (filename === '' || filename === 'index.html') {
      breadcrumbContainer.style.display = "none";
      return;
    }
  
    const pageTitle = filename
      .replace('.html','')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  
    breadcrumbContainer.innerHTML = `
      <a href="/wdd330/src/">Home</a> &gt;
      <span>${pageTitle}</span>
    `;
  });