const glitchText = document.querySelector('.glitch-write');
const originalText = glitchText.textContent;
const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';

// Initial scramble effect
function startScrambleEffect() {
    // Start with fully scrambled text
    let currentText = '';
    for(let i = 0; i < originalText.length; i++) {
        currentText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
    glitchText.textContent = currentText;

    let correctPositions = new Set();
    
    // Gradually decrypt the text
    const decryptInterval = setInterval(() => {
        let newText = '';
        for(let i = 0; i < originalText.length; i++) {
            if(correctPositions.has(i)) {
                newText += originalText[i];
            } else {
                newText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
        }
        glitchText.textContent = newText;
        
        // Randomly fix one character
        if(correctPositions.size < originalText.length) {
            let pos;
            do {
                pos = Math.floor(Math.random() * originalText.length);
            } while(correctPositions.has(pos));
            correctPositions.add(pos);
        } else {
            // All characters are correct, start the occasional glitch effect
            clearInterval(decryptInterval);
            setInterval(occasionalGlitch, 1500);
        }
    }, 50); // Update scramble every 50ms
}

// Occasional glitch effect (after text is decrypted)
function occasionalGlitch() {
    const text = glitchText.textContent;
    const numGlitches = Math.floor(Math.random() * 3) + 1;
    let positions = [];
    
    // Select random positions
    for (let i = 0; i < numGlitches; i++) {
        let pos;
        do {
            pos = Math.floor(Math.random() * text.length);
        } while (positions.includes(pos));
        positions.push(pos);
    }
    
    // Apply glitch
    let glitchedText = text;
    for (let pos of positions) {
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
        glitchedText = 
            glitchedText.substring(0, pos) + 
            randomChar + 
            glitchedText.substring(pos + 1);
    }
    
    glitchText.textContent = glitchedText;
    glitchText.classList.add('shake');
    
    // Restore
    setTimeout(() => {
        glitchText.textContent = originalText;
        glitchText.classList.remove('shake');
    }, 100);
}

// Start the effect
startScrambleEffect();