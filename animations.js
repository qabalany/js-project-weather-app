// === ANIMATIONS.TS ===
// Module for handling animations in the weather app.
// Includes night mode background and starry effect management, and daytime animations.
// Global variables for mode control
let isManualMode = false; // true if user manually set mode, false for auto time-based
let isDarkMode = false; // true if currently showing dark mode, false for light mode
// --- FUNCTION: toggleDayModeAnimation ---
// Helper function to add or remove daytime background animation.
// Applies animated gradient and floating particles to the today-weather-view for sunny daytime effect.
export function toggleDayModeAnimation(isDay) {
    const view = document.querySelector('.today-weather-view');
    if (!view)
        return;
    if (isDay) {
        view.classList.add('day-mode-animation');
    }
    else {
        view.classList.remove('day-mode-animation');
    }
}
// --- FUNCTION: toggleNightModeAnimation ---
// Helper function to add or remove starry animation elements for night mode.
// Creates the authentic CodePen starry night animation with shooting stars.
export function toggleNightModeAnimation(isNight) {
    const view = document.querySelector('.today-weather-view');
    if (!view)
        return;
    const stars = view.querySelector('.stars');
    if (isNight) {
        if (!stars) {
            // Create and append the stars container with shooting stars
            const starsDiv = document.createElement('div');
            starsDiv.className = 'stars';
            // Generate 20 shooting stars as in the CodePen
            let starsHTML = '';
            for (let i = 1; i <= 20; i++) {
                starsHTML += `<div class="shooting_star shooting${i}"></div>`;
            }
            starsDiv.innerHTML = starsHTML;
            view.appendChild(starsDiv);
        }
    }
    else {
        // Remove the stars container if it exists
        if (stars) {
            stars.remove();
        }
    }
}
// --- FUNCTION: updateNightMode ---
// Updates the background of .today-weather-view based on current time vs sunset.
// Calls toggleNightModeAnimation to manage the starry effect.
// Only applies if not in manual mode.
export function updateNightMode(sunrise, sunset) {
    // Skip auto mode updates if user has manually set the mode
    if (isManualMode)
        return;
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const view = document.querySelector('.today-weather-view');
    if (view) {
        const isNight = currentTime > sunset && sunset !== 'N/A';
        isDarkMode = isNight; // Update current mode state
        if (isNight) {
            view.classList.add('night-mode');
        }
        else {
            view.classList.remove('night-mode');
        }
        // Use helper to toggle animation elements
        toggleNightModeAnimation(isNight);
        // Toggle daytime animation (opposite of night mode)
        toggleDayModeAnimation(!isNight);
    }
}
// --- FUNCTION: initializeDayNightToggle ---
// Sets up the day/night toggle button and keyboard shortcuts for manual mode switching.
export function initializeDayNightToggle(onModeChange) {
    const dayNightBtn = document.getElementById("dayNightToggleBtn");
    // Day/Night mode toggle button
    if (dayNightBtn) {
        const updateButtonAppearance = () => {
            const iconSpan = dayNightBtn.querySelector('.nav-icon');
            const textSpan = dayNightBtn.querySelector('.nav-text');
            if (iconSpan && textSpan) {
                // Show what the button will switch TO (opposite of current state)
                if (isDarkMode) {
                    // Currently dark, button will switch to light
                    iconSpan.textContent = '☀️';
                }
                else {
                    // Currently light, button will switch to dark
                    iconSpan.textContent = '🌙';
                }
                textSpan.textContent = 'mode';
            }
        };
        updateButtonAppearance();
        dayNightBtn.addEventListener("click", () => {
            // Toggle the current mode
            isDarkMode = !isDarkMode;
            isManualMode = true; // User has manually set the mode
            updateButtonAppearance();
            // Immediately apply visual changes
            const view = document.querySelector('.today-weather-view');
            if (view) {
                if (isDarkMode) {
                    // Switch to dark mode
                    view.classList.add('night-mode');
                    toggleNightModeAnimation(true);
                    toggleDayModeAnimation(false);
                }
                else {
                    // Switch to light mode
                    view.classList.remove('night-mode');
                    toggleNightModeAnimation(false);
                    toggleDayModeAnimation(true);
                }
            }
            onModeChange(); // Trigger reload to get updated data
        });
    }
    // Add keyboard shortcut to toggle day/night mode for testing
    document.addEventListener('keydown', (event) => {
        if (event.key === 'd' || event.key === 'D') {
            // Toggle the current mode
            isDarkMode = !isDarkMode;
            isManualMode = true; // User has manually set the mode
            // Update button appearance if it exists
            const dayNightBtn = document.getElementById("dayNightToggleBtn");
            if (dayNightBtn) {
                const iconSpan = dayNightBtn.querySelector('.nav-icon');
                const textSpan = dayNightBtn.querySelector('.nav-text');
                if (iconSpan && textSpan) {
                    if (isDarkMode) {
                        iconSpan.textContent = '☀️';
                    }
                    else {
                        iconSpan.textContent = '🌙';
                    }
                    textSpan.textContent = 'mode';
                }
            }
            // Immediately apply visual changes
            const view = document.querySelector('.today-weather-view');
            if (view) {
                if (isDarkMode) {
                    // Switch to dark mode
                    view.classList.add('night-mode');
                    toggleNightModeAnimation(true);
                    toggleDayModeAnimation(false);
                }
                else {
                    // Switch to light mode
                    view.classList.remove('night-mode');
                    toggleNightModeAnimation(false);
                    toggleDayModeAnimation(true);
                }
            }
            onModeChange(); // Trigger reload
        }
    });
}
//# sourceMappingURL=animations.js.map