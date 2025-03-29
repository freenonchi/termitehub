// Show splash screen on load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('splashScreen').style.display = 'flex';
    
    // Handle enter button click
    document.getElementById('enterButton').onclick = function() {
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    };
    
    // Handle exit button click
    document.getElementById('exitButton').onclick = function() {
        window.close(); // Attempt to close the tab/window
        // Fallback for browsers that block window.close()
        window.location.href = 'about:blank';
    };

    // Wait for full DOM load
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded"); // Debug confirmation
    
    // Get elements with null checks
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const enterButton = document.getElementById('enterButton');
    const exitButton = document.getElementById('exitButton');

    // Debug: Verify elements exist
    if (!splashScreen || !mainContent || !enterButton || !exitButton) {
        console.error("Critical elements missing!");
        if (!splashScreen) console.error("splashScreen not found");
        if (!mainContent) console.error("mainContent not found");
        if (!enterButton) console.error("enterButton not found");
        if (!exitButton) console.error("exitButton not found");
        return;
    }

    // Show splash screen initially
    splashScreen.style.display = 'flex';
    mainContent.style.display = 'none';

    // Improved enter button handler
    enterButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Enter button clicked");
        splashScreen.style.display = 'none';
        mainContent.style.display = 'block';
        
        // Force redraw for some browsers
        void splashScreen.offsetHeight;
    });

    // More reliable exit button handler
    exitButton.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Exit button clicked");
        
        // Try closing window
        if (window.close()) {
            return;
        }
        
        // Fallback options
        try {
            // Try redirecting
            window.location.href = 'about:blank';
            
            // Final fallback
            setTimeout(() => {
                document.body.innerHTML = `
                    <div style="text-align:center;padding:50px;background:#1e1e1e;color:#e0e0e0;height:100vh;">
                        <h1>🐜 Termites ate your exit attempt!</h1>
                        <p>Try closing the tab manually</p>
                    </div>
                `;
            }, 1000);
        } catch (err) {
            console.error("Exit failed:", err);
        }
    });
});
    
    // Social media links
    const socialLinks = {
        discord: 'https://www.youtube.com/watch?v=2qBlE2-WL60&ab_channel=robro_.13',
        instagram: 'https://www.youtube.com/watch?v=2qBlE2-WL60&ab_channel=robro_.13',
        tiktok: 'https://www.youtube.com/watch?v=2qBlE2-WL60&ab_channel=robro_.13',
        twitter: 'https://www.youtube.com/watch?v=2qBlE2-WL60&ab_channel=robro_.13',
        youtube: 'https://www.youtube.com/watch?v=2qBlE2-WL60&ab_channel=robro_.13'
    };

    // Category tag click handler
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelector('.category-tag.active').classList.remove('active');
            this.classList.add('active');
            // Filter functionality would go here
        });
    });
    
    // Termite mode button
    document.getElementById("termite-mode").addEventListener("click", function() {
        alert("TERMITE MODE ACTIVATED! Say goodbye to your pixels...");
        startTermiteInfection();
    });
});

function startTermiteInfection() {
    const body = document.body;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelSize = 4;
    const infectionSpeed = 30;
    const maxInfections = 10000;

    const infectedGrid = {};
    const infectionFrontiers = [];
    
    function markInfected(x, y, frontierIndex) {
        const gridX = Math.floor(x / pixelSize);
        const gridY = Math.floor(y / pixelSize);
        const key = `${gridX},${gridY}`;
        
        if (!infectedGrid[key]) {
            infectedGrid[key] = true;
            createHole(x, y);
            
            if (frontierIndex !== undefined && infectionFrontiers[frontierIndex]) {
                infectionFrontiers[frontierIndex].push({x, y});
            }
        }
    }

    function isInfected(x, y) {
        const gridX = Math.floor(x / pixelSize);
        const gridY = Math.floor(y / pixelSize);
        return infectedGrid[`${gridX},${gridY}`];
    }

    for (let i = 0; i < 5; i++) {
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        infectionFrontiers.push([{x: startX, y: startY}]);
        markInfected(startX, startY, i);
    }

    function spreadInfection() {
        let newInfections = 0;
        
        infectionFrontiers.forEach((frontier, frontierIndex) => {
            if (frontier.length > 0) {
                const randomIndex = Math.floor(Math.random() * frontier.length);
                const source = frontier[randomIndex];
                
                const angle = Math.random() * Math.PI * 2;
                const newX = source.x + Math.cos(angle) * pixelSize * 2;
                const newY = source.y + Math.sin(angle) * pixelSize * 2;
                
                if (newX >= 0 && newX < width && newY >= 0 && newY < height && !isInfected(newX, newY)) {
                    markInfected(newX, newY, frontierIndex);
                    newInfections++;
                }
                
                if (Math.random() < 0.1) {
                    frontier.splice(randomIndex, 1);
                }
            }
        });
        
        if (Object.keys(infectedGrid).length < maxInfections && newInfections > 0) {
            setTimeout(spreadInfection, infectionSpeed);
        } else if (Math.random() < 0.05 && infectionFrontiers.length < 10) {
            const startX = Math.random() * width;
            const startY = Math.random() * height;
            if (!isInfected(startX, startY)) {
                infectionFrontiers.push([{x: startX, y: startY}]);
                markInfected(startX, startY, infectionFrontiers.length - 1);
                setTimeout(spreadInfection, infectionSpeed);
            }
        }
    }

    function createHole(x, y) {
        const hole = document.createElement("div");
        hole.style.position = "fixed";
        hole.style.width = `${pixelSize}px`;
        hole.style.height = `${pixelSize}px`;
        hole.style.background = "black";
        hole.style.left = `${x}px`;
        hole.style.top = `${y}px`;
        hole.style.pointerEvents = "none";
        hole.style.borderRadius = "50%";
        body.appendChild(hole);
    }

    spreadInfection();
}