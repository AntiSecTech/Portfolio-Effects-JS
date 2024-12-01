function typeHeading() {
    const headingElement = document.querySelector('.glitch-text');
    const text = headingElement.getAttribute('data-text');
    headingElement.textContent = ''; // Clear initial text
    headingElement.style.opacity = '1'; // Make visible
    
    let charIndex = 0;
    const typeSpeed = 100; // Adjust speed as needed

    function type() {
        if (charIndex < text.length) {
            headingElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, typeSpeed);
        } else {
            // After typing is complete, add glitch effect
            headingElement.classList.add('glitch-active');
        }
    }

    type();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeHeading, 500);
});