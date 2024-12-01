const glitchText = document.querySelector('.glitch-write');
const originalText = glitchText.textContent;
const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';

// Typewriter effect
function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.textContent = text.substring(0, i + 1);
        setTimeout(() => typeWriter(element, text, i + 1), 100);
    } else {
        // Start more frequent glitch effects after typing is done
        setInterval(glitchEffect, 1500);  // More frequent glitches
    }
}

// Glitch effect
function glitchEffect() {
    const text = glitchText.textContent;
    // Glitch 1-3 characters at once
    const numGlitches = Math.floor(Math.random() * 3) + 1;
    let positions = [];
    let originalChars = [];
    
    // Store positions and original characters
    for (let i = 0; i < numGlitches; i++) {
        let pos;
        do {
            pos = Math.floor(Math.random() * text.length);
        } while (positions.includes(pos)); // Avoid same position twice
        
        positions.push(pos);
        originalChars.push(text[pos]);
    }
    
    // Sort positions for correct string manipulation
    positions.sort((a, b) => a - b);
    
    // Create glitched text
    let glitchedText = text;
    for (let i = 0; i < positions.length; i++) {
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        glitchedText = 
            glitchedText.substring(0, positions[i]) + 
            randomChar + 
            glitchedText.substring(positions[i] + 1);
    }
    
    glitchText.textContent = glitchedText;
    glitchText.classList.add('shake');
    
    // Restore original characters and remove shake
    setTimeout(() => {
        glitchText.textContent = originalText;
        glitchText.classList.remove('shake');
    }, 100);
}

// Start the typewriter effect
typeWriter(glitchText, originalText);