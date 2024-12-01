// Scroll Progress Indicator
function updateScrollProgress() {
    const html = document.documentElement;
    const height = html.scrollHeight - html.clientHeight;
    const scrolled = (html.scrollTop / height) * 100;
    document.documentElement.style.setProperty('--scroll', `${scrolled}%`);
}

// Add scroll event listener
document.addEventListener('scroll', updateScrollProgress);

// Initial call to set progress on page load
document.addEventListener('DOMContentLoaded', updateScrollProgress);