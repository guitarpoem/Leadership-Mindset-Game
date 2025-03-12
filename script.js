// Leadership traits
const traits = [
    {
        name: "Adaptability",
        icon: "🔄",
        description: "Ability to adjust to changing circumstances",
        class: "adaptability",
        qualities: ["Behaviour"]
    },
    {
        name: "Communication",
        icon: "💬",
        description: "Effective exchange of information and ideas",
        class: "communication",
        qualities: ["Engage"]
    },
    {
        name: "Decisiveness",
        icon: "⚡",
        description: "Making timely and effective decisions",
        class: "decisiveness",
        qualities: ["Choice"]
    },
    {
        name: "Emotional Intelligence",
        icon: "❤️",
        description: "Understanding emotions",
        class: "ei",
        qualities: ["Awareness", "Empower"]
    },
    {
        name: "Ethical Integrity",
        icon: "⚖️",
        description: "Moral & ethical principles",
        class: "ethics",
        qualities: ["Choice"]
    },
    {
        name: "Strategic Thinking",
        icon: "🧠",
        description: "Long-term planning & vision",
        class: "strategic",
        qualities: ["Choice"]
    },
    {
        name: "Transparency",
        icon: "👁️",
        description: "Open and honest communication",
        class: "transparency",
        qualities: ["Empower"]
    },
    {
        name: "Resilience",
        icon: "🛡️",
        description: "Ability to recover from setbacks",
        class: "resilience",
        qualities: ["Behaviour", "Enable"]
    },
    {
        name: "Conflict Resolution",
        icon: "🤝",
        description: "Resolving disagreements",
        class: "conflict",
        qualities: ["Enable"]
    },
    {
        name: "Collaboration",
        icon: "👥",
        description: "Working effectively with others",
        class: "collaboration",
        qualities: ["Engage"]
    }
];

// Crisis events with required traits and images - using local images
const crisisEvents = [
    {
        name: "Supply Chain Disruptions",
        description: "Global events have severely disrupted your supply chain, threatening production and delivery timelines.",
        requiredTraits: ["Adaptability", "Strategic Thinking", "Collaboration"],
        image: "pictures/supply-chain-disruption.jpg"
    },
    {
        name: "Sudden Leadership Changes",
        description: "Your CEO has resigned unexpectedly, creating a leadership vacuum.",
        requiredTraits: ["Decisiveness", "Resilience", "Communication"],
        image: "pictures/leadership-change.jpg"
    },
    {
        name: "Mass Layoffs & Downsizing",
        description: "Your company needs to reduce workforce by 30% due to financial pressures. How do you handle this difficult situation?",
        requiredTraits: ["Emotional Intelligence", "Transparency", "Resilience"],
        image: "pictures/layoffs.jpg"
    },
    {
        name: "Protests & Employee Strikes",
        description: "Workers are striking over compensation and working conditions, halting production.",
        requiredTraits: ["Conflict Resolution", "Communication", "Transparency"],
        image: "pictures/employee-strike.jpg"
    },
    {
        name: "Pandemic Response & Workforce Safety",
        description: "A global health crisis requires immediate changes to work arrangements and safety protocols.",
        requiredTraits: ["Adaptability", "Emotional Intelligence", "Strategic Thinking"],
        image: "pictures/pandemic.jpg"
    },
    {
        name: "Public Relations Crisis",
        description: "Your product has been linked to health concerns in a viral social media campaign.",
        requiredTraits: ["Communication", "Transparency", "Ethical Integrity"],
        image: "pictures/pr-crisis.jpg"
    },
    {
        name: "Cybersecurity Breach",
        description: "Your company has suffered a major data breach, exposing sensitive customer information.",
        requiredTraits: ["Decisiveness", "Transparency", "Resilience"],
        image: "pictures/cybersecurity.jpg"
    },
    {
        name: "Corporate Scandal & Ethical Breach",
        description: "A senior executive has been caught falsifying financial reports. The media is demanding answers.",
        requiredTraits: ["Ethical Integrity", "Transparency", "Resilience"],
        image: "pictures/corporate-scandal.jpg"
    },
    {
        name: "Hostile Takeover or Merger",
        description: "A larger competitor has made an unsolicited bid to acquire your company.",
        requiredTraits: ["Strategic Thinking", "Conflict Resolution", "Communication"],
        image: "pictures/hostile-takeover.jpg"
    },
    {
        name: "Natural Disasters",
        description: "A hurricane has damaged your main facility and disrupted operations. Employee safety is at risk.",
        requiredTraits: ["Adaptability", "Resilience", "Collaboration"],
        image: "pictures/natural-disaster.jpg"
    }
];

// Game state
let playerTraits = [];
let requiredTraits = [];
let currentCrisis = null;
let score = 0;
let currentRound = 1;
let selectedTraitIndex = -1;
let selectedNewTraitIndex = -1;
let usedCrises = [];
let selectedInitialTraits = []; // Track selected initial traits

// DOM elements
const playerHandElement = document.getElementById('player-hand');
const shownCardsElement = document.getElementById('shown-cards');
const scoreElement = document.getElementById('score');
const roundElement = document.getElementById('round');
const crisisDescriptionElement = document.getElementById('crisis-description');
const roundResultElement = document.getElementById('round-result');
const nextRoundBtn = document.getElementById('next-round-btn');
const discardSection = document.getElementById('discard-section');
const discardOptions = document.getElementById('discard-options');
const newTraitOptions = document.getElementById('new-trait-options');
const discardBtn = document.getElementById('discard-btn');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const finalMessageElement = document.getElementById('final-message');
const playAgainBtn = document.getElementById('play-again-btn');
const crisisNameElement = document.getElementById('crisis-name');
const crisisImageElement = document.getElementById('crisis-image');

// Add new DOM elements
const initialTraitSelectionSection = document.createElement('div');
initialTraitSelectionSection.id = 'initial-trait-selection';
initialTraitSelectionSection.className = 'initial-trait-selection';

const initialTraitSelectionTitle = document.createElement('h2');
initialTraitSelectionTitle.textContent = 'Select Your 5 Leadership Traits';
initialTraitSelectionSection.appendChild(initialTraitSelectionTitle);

const initialTraitSelectionDescription = document.createElement('p');
initialTraitSelectionDescription.textContent = 'Choose 5 traits that will define your leadership style:';
initialTraitSelectionSection.appendChild(initialTraitSelectionDescription);

const initialTraitOptions = document.createElement('div');
initialTraitOptions.id = 'initial-trait-options';
initialTraitOptions.className = 'cards-container';
initialTraitSelectionSection.appendChild(initialTraitOptions);

const selectedTraitsContainer = document.createElement('div');
selectedTraitsContainer.id = 'selected-traits-container';
selectedTraitsContainer.className = 'selected-traits-container';
initialTraitSelectionSection.appendChild(selectedTraitsContainer);

const selectedTraitsTitle = document.createElement('h3');
selectedTraitsTitle.textContent = 'Your Selected Traits: 0/5';
selectedTraitsTitle.id = 'selected-traits-title';
selectedTraitsContainer.appendChild(selectedTraitsTitle);

const selectedTraitsDisplay = document.createElement('div');
selectedTraitsDisplay.id = 'selected-traits-display';
selectedTraitsDisplay.className = 'cards-container';
selectedTraitsContainer.appendChild(selectedTraitsDisplay);

const confirmTraitsBtn = document.createElement('button');
confirmTraitsBtn.id = 'confirm-traits-btn';
confirmTraitsBtn.className = 'btn';
confirmTraitsBtn.textContent = 'Confirm Traits & Start Game';
confirmTraitsBtn.disabled = true;
initialTraitSelectionSection.appendChild(confirmTraitsBtn);

// Initialize the game
function initGame() {
    // Reset game state
    playerTraits = [];
    requiredTraits = [];
    currentCrisis = null;
    score = 0;
    currentRound = 1;
    selectedTraitIndex = -1;
    selectedNewTraitIndex = -1;
    usedCrises = [];
    selectedInitialTraits = [];
    
    // Hide game elements
    document.querySelector('.game-info').style.display = 'none';
    document.getElementById('crisis-event').style.display = 'none';
    document.querySelector('.game-area').style.display = 'none';
    roundResultElement.style.display = 'none';
    discardSection.classList.add('hidden');
    gameOverElement.classList.add('hidden');
    nextRoundBtn.style.display = 'none';
    
    // Show trait selection
    document.querySelector('.container').appendChild(initialTraitSelectionSection);
    initialTraitSelectionSection.style.display = 'block';
    
    // Render all available traits for selection
    renderInitialTraitOptions();
    
    // Reset selected traits display
    selectedTraitsDisplay.innerHTML = '';
    selectedTraitsTitle.textContent = 'Your Selected Traits: 0/5';
    confirmTraitsBtn.disabled = true;
}

// Render all traits for initial selection
function renderInitialTraitOptions() {
    initialTraitOptions.innerHTML = '';
    
    // Create quality sections
    const qualityGroups = {
        'Awareness': [],
        'Behaviour': [],
        'Choice': [],
        'Engage': [],
        'Empower': [],
        'Enable': []
    };
    
    // Group traits by quality - now a trait can appear in multiple groups
    traits.forEach((trait, index) => {
        const traitElement = document.createElement('div');
        traitElement.className = `card ${trait.class}`;
        traitElement.dataset.index = index;
        
        // Create quality labels container for multiple qualities
        const qualityLabelsContainer = document.createElement('div');
        qualityLabelsContainer.className = 'quality-labels-container';
        
        // Add a label for each quality
        trait.qualities.forEach(quality => {
            const qualityLabel = document.createElement('div');
            qualityLabel.className = 'quality-label';
            qualityLabel.textContent = quality;
            qualityLabelsContainer.appendChild(qualityLabel);
        });
        
        const iconElement = document.createElement('div');
        iconElement.className = 'trait-icon';
        iconElement.textContent = trait.icon;
        
        const nameElement = document.createElement('div');
        nameElement.className = 'trait-name';
        nameElement.textContent = trait.name;
        
        const descElement = document.createElement('div');
        descElement.className = 'trait-description';
        descElement.textContent = trait.description;
        
        traitElement.appendChild(qualityLabelsContainer);
        traitElement.appendChild(iconElement);
        traitElement.appendChild(nameElement);
        traitElement.appendChild(descElement);
        
        // Add click event listener
        traitElement.addEventListener('click', () => {
            if (selectedInitialTraits.length < 5 && !traitElement.classList.contains('selected')) {
                traitElement.classList.add('selected');
                selectedInitialTraits.push(traits[index]);
                updateSelectedTraitsDisplay();
            } else if (traitElement.classList.contains('selected')) {
                traitElement.classList.remove('selected');
                selectedInitialTraits = selectedInitialTraits.filter(t => t.name !== traits[index].name);
                updateSelectedTraitsDisplay();
            }
        });
        
        // Add the trait to all its quality groups
        trait.qualities.forEach(quality => {
            qualityGroups[quality].push(traitElement.cloneNode(true));
        });
    });
    
    // Add quality sections to the container
    Object.entries(qualityGroups).forEach(([quality, traitElements]) => {
        if (traitElements.length > 0) {
            const qualitySection = document.createElement('div');
            qualitySection.className = 'quality-section';
            
            const qualityTitle = document.createElement('h4');
            qualityTitle.className = 'quality-title';
            qualityTitle.textContent = quality;
            qualitySection.appendChild(qualityTitle);
            
            const traitsContainer = document.createElement('div');
            traitsContainer.className = 'traits-container';
            traitElements.forEach(element => {
                // Add click event listener to the cloned element
                element.addEventListener('click', () => {
                    const index = element.dataset.index;
                    const trait = traits[index];
                    if (selectedInitialTraits.length < 5 && !element.classList.contains('selected')) {
                        element.classList.add('selected');
                        selectedInitialTraits.push(trait);
                        updateSelectedTraitsDisplay();
                    } else if (element.classList.contains('selected')) {
                        element.classList.remove('selected');
                        selectedInitialTraits = selectedInitialTraits.filter(t => t.name !== trait.name);
                        updateSelectedTraitsDisplay();
                    }
                });
                traitsContainer.appendChild(element);
            });
            qualitySection.appendChild(traitsContainer);
            
            initialTraitOptions.appendChild(qualitySection);
        }
    });
}

// Update the display of selected traits
function updateSelectedTraitsDisplay() {
    selectedTraitsDisplay.innerHTML = '';
    selectedTraitsTitle.textContent = `Your Selected Traits: ${selectedInitialTraits.length}/5`;
    
    selectedInitialTraits.forEach((trait, index) => {
        const traitElement = document.createElement('div');
        traitElement.className = `card ${trait.class}`;
        
        const iconElement = document.createElement('div');
        iconElement.className = 'trait-icon';
        iconElement.textContent = trait.icon;
        
        const nameElement = document.createElement('div');
        nameElement.className = 'trait-name';
        nameElement.textContent = trait.name;
        
        const descElement = document.createElement('div');
        descElement.className = 'trait-description';
        descElement.textContent = trait.description;
        
        traitElement.appendChild(iconElement);
        traitElement.appendChild(nameElement);
        traitElement.appendChild(descElement);
        
        selectedTraitsDisplay.appendChild(traitElement);
    });
    
    // Enable/disable confirm button based on selection count
    confirmTraitsBtn.disabled = selectedInitialTraits.length !== 5;
}

// Start the game with selected traits
function startGameWithSelectedTraits() {
    // Set player traits to selected traits
    playerTraits = [...selectedInitialTraits];
    
    // Hide trait selection, intro, and rules
    initialTraitSelectionSection.style.display = 'none';
    document.getElementById('game-intro').style.display = 'none';
    document.getElementById('game-rules').style.display = 'none';
    
    // Show game elements
    document.querySelector('.game-info').style.display = 'flex';
    document.getElementById('crisis-event').style.display = 'block';
    document.querySelector('.game-area').style.display = 'flex';
    roundResultElement.style.display = 'block';
    nextRoundBtn.style.display = 'block';
    
    // Update UI
    updateUI();
    
    // Automatically start the first round
    startRound();
    
    // Change button text for subsequent rounds
    nextRoundBtn.textContent = 'Next Round';
    nextRoundBtn.disabled = true;
}

// Update the UI with current game state
function updateUI() {
    // Update score and round
    scoreElement.textContent = score;
    roundElement.textContent = currentRound;
    
    // Update player traits
    renderPlayerHand();
    
    // Update required traits
    renderRequiredTraits();
}

// Render traits in a container
function renderTraits(container, traitsList) {
    container.innerHTML = '';
    
    traitsList.forEach((trait, index) => {
        const traitElement = document.createElement('div');
        traitElement.className = `card ${trait.class}`;
        traitElement.dataset.index = index;
        
        const iconElement = document.createElement('div');
        iconElement.className = 'trait-icon';
        iconElement.textContent = trait.icon;
        
        const nameElement = document.createElement('div');
        nameElement.className = 'trait-name';
        nameElement.textContent = trait.name;
        
        const descElement = document.createElement('div');
        descElement.className = 'trait-description';
        descElement.textContent = trait.description;
        
        traitElement.appendChild(iconElement);
        traitElement.appendChild(nameElement);
        traitElement.appendChild(descElement);
        
        container.appendChild(traitElement);
    });
}

// Update the renderPlayerHand function to include quality labels
function renderPlayerHand() {
    playerHandElement.innerHTML = '';
    
    playerTraits.forEach((trait, index) => {
        const traitElement = document.createElement('div');
        traitElement.className = `card ${trait.class}`;
        
        // Create quality labels container for multiple qualities
        const qualityLabelsContainer = document.createElement('div');
        qualityLabelsContainer.className = 'quality-labels-container';
        
        // Add a label for each quality
        trait.qualities.forEach(quality => {
            const qualityLabel = document.createElement('div');
            qualityLabel.className = 'quality-label';
            qualityLabel.textContent = quality;
            qualityLabelsContainer.appendChild(qualityLabel);
        });
        
        const iconElement = document.createElement('div');
        iconElement.className = 'trait-icon';
        iconElement.textContent = trait.icon;
        
        const nameElement = document.createElement('div');
        nameElement.className = 'trait-name';
        nameElement.textContent = trait.name;
        
        const descElement = document.createElement('div');
        descElement.className = 'trait-description';
        descElement.textContent = trait.description;
        
        traitElement.appendChild(qualityLabelsContainer);
        traitElement.appendChild(iconElement);
        traitElement.appendChild(nameElement);
        traitElement.appendChild(descElement);
        
        // Add click event for discard selection
        traitElement.addEventListener('click', () => {
            if (discardSection.classList.contains('hidden')) return;
            
            // Remove selected class from all cards
            document.querySelectorAll('#discard-options .card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            traitElement.classList.add('selected');
            selectedTraitIndex = index;
            
            // Check if both selections are made
            checkSelections();
        });
        
        playerHandElement.appendChild(traitElement);
    });
}

// Update the renderRequiredTraits function to include quality labels
function renderRequiredTraits() {
    shownCardsElement.innerHTML = '';
    
    requiredTraits.forEach(trait => {
        const traitElement = document.createElement('div');
        traitElement.className = `card ${trait.class}`;
        
        // Create quality labels container for multiple qualities
        const qualityLabelsContainer = document.createElement('div');
        qualityLabelsContainer.className = 'quality-labels-container';
        
        // Add a label for each quality
        trait.qualities.forEach(quality => {
            const qualityLabel = document.createElement('div');
            qualityLabel.className = 'quality-label';
            qualityLabel.textContent = quality;
            qualityLabelsContainer.appendChild(qualityLabel);
        });
        
        const iconElement = document.createElement('div');
        iconElement.className = 'trait-icon';
        iconElement.textContent = trait.icon;
        
        const nameElement = document.createElement('div');
        nameElement.className = 'trait-name';
        nameElement.textContent = trait.name;
        
        const descElement = document.createElement('div');
        descElement.className = 'trait-description';
        descElement.textContent = trait.description;
        
        traitElement.appendChild(qualityLabelsContainer);
        traitElement.appendChild(iconElement);
        traitElement.appendChild(nameElement);
        traitElement.appendChild(descElement);
        
        shownCardsElement.appendChild(traitElement);
    });
}

// Start a new round
function startRound() {
    // Get the crisis for the current round (using currentRound - 1 as array index)
    currentCrisis = crisisEvents[currentRound - 1];
    
    // Update crisis name, image and description
    crisisNameElement.textContent = currentCrisis.name;
    crisisImageElement.style.backgroundImage = `url('${currentCrisis.image}')`;
    crisisDescriptionElement.textContent = currentCrisis.description;
    
    // Get required traits for this crisis
    requiredTraits = [];
    currentCrisis.requiredTraits.forEach(traitName => {
        const trait = traits.find(t => t.name === traitName);
        if (trait) {
            requiredTraits.push(trait);
        }
    });
    
    // Calculate matches
    const matches = calculateMatches();
    
    // Award points
    let roundPoints = 0;
    roundResultElement.className = 'round-result';
    
    if (matches === 3) {
        roundPoints = 100;
        roundResultElement.textContent = 'Perfect leadership response! +100 points';
        roundResultElement.classList.add('success');
    } else if (matches === 2) {
        roundPoints = 50;
        roundResultElement.textContent = 'Good leadership response! +50 points';
        roundResultElement.classList.add('partial');
    } else {
        roundResultElement.textContent = `Limited leadership response. ${matches} matching trait${matches === 1 ? '' : 's'}. No points.`;
        roundResultElement.classList.add('failure');
    }
    
    score += roundPoints;
    
    // Update UI
    updateUI();
    
    // Show choice buttons if not the last round
    if (currentRound < 10) {
        showChoiceButtons();
    } else {
        // Game over
        endGame();
    }
}

// Calculate how many traits match between player traits and required traits
function calculateMatches() {
    let matches = 0;
    
    playerTraits.forEach(playerTrait => {
        if (requiredTraits.some(requiredTrait => requiredTrait.name === playerTrait.name)) {
            matches++;
        }
    });
    
    return matches;
}

// Create a function to show the choice buttons
function showChoiceButtons() {
    // Create a container for the choice buttons if it doesn't exist
    if (!document.getElementById('choice-buttons-container')) {
        const choiceButtonsContainer = document.createElement('div');
        choiceButtonsContainer.id = 'choice-buttons-container';
        choiceButtonsContainer.className = 'choice-buttons-container';
        
        // Create "Replace One Trait" button with updated text
        const replaceButton = document.createElement('button');
        replaceButton.id = 'replace-trait-btn';
        replaceButton.className = 'btn replace-btn';
        replaceButton.textContent = 'Replace One Trait to Update Mindset';
        replaceButton.addEventListener('click', () => {
            // Hide choice buttons
            choiceButtonsContainer.style.display = 'none';
            // Show discard section
            showDiscardSection();
        });
        
        // Create "Next Round" button
        const nextRoundButton = document.createElement('button');
        nextRoundButton.id = 'next-round-choice-btn';
        nextRoundButton.className = 'btn next-round-btn';
        nextRoundButton.textContent = 'Next Round';
        nextRoundButton.addEventListener('click', () => {
            // Hide choice buttons
            choiceButtonsContainer.style.display = 'none';
            // Proceed to next round
            currentRound++;
            startRound();
        });
        
        // Add buttons to container
        choiceButtonsContainer.appendChild(replaceButton);
        choiceButtonsContainer.appendChild(nextRoundButton);
        
        // Add container to the page
        document.querySelector('.container').insertBefore(choiceButtonsContainer, discardSection);
    } else {
        // Show the existing choice buttons container
        document.getElementById('choice-buttons-container').style.display = 'flex';
    }
    
    // Hide the discard section
    discardSection.classList.add('hidden');
    
    // Hide the next round button
    nextRoundBtn.style.display = 'none';
}

// Update the showDiscardSection function to remove the skip button
function showDiscardSection() {
    discardSection.classList.remove('hidden');
    
    // Update the discard button text to be clearer
    discardBtn.textContent = 'Confirm Trait Replacement';
    
    // Add a cancel button if it doesn't exist
    if (!document.getElementById('cancel-replace-btn')) {
        const cancelReplaceBtn = document.createElement('button');
        cancelReplaceBtn.id = 'cancel-replace-btn';
        cancelReplaceBtn.className = 'btn cancel-btn';
        cancelReplaceBtn.textContent = 'Cancel';
        cancelReplaceBtn.addEventListener('click', () => {
            // Hide discard section
            discardSection.classList.add('hidden');
            // Show choice buttons again
            showChoiceButtons();
        });
        
        // Insert the cancel button before the confirm button
        discardSection.insertBefore(cancelReplaceBtn, discardBtn);
    }
    
    renderDiscardOptions();
    renderNewTraitOptions();
}

// Render discard options
function renderDiscardOptions() {
    discardOptions.innerHTML = '';
    
    playerTraits.forEach((trait, index) => {
        const traitElement = document.createElement('div');
        traitElement.className = `card ${trait.class}`;
        traitElement.dataset.index = index;
        
        const iconElement = document.createElement('div');
        iconElement.className = 'trait-icon';
        iconElement.textContent = trait.icon;
        
        const nameElement = document.createElement('div');
        nameElement.className = 'trait-name';
        nameElement.textContent = trait.name;
        
        const descElement = document.createElement('div');
        descElement.className = 'trait-description';
        descElement.textContent = trait.description;
        
        traitElement.appendChild(iconElement);
        traitElement.appendChild(nameElement);
        traitElement.appendChild(descElement);
        
        traitElement.addEventListener('click', () => {
            // Remove selected class from all cards
            document.querySelectorAll('#discard-options .card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            traitElement.classList.add('selected');
            selectedTraitIndex = index;
            
            // Check if both selections are made
            checkSelections();
        });
        
        discardOptions.appendChild(traitElement);
    });
}

// Render new trait options - modified to offer the required traits from the current crisis
function renderNewTraitOptions() {
    newTraitOptions.innerHTML = '';
    
    // Get available traits for replacement
    const crisisTraits = getNewTraitOptions();
    
    crisisTraits.forEach((trait, index) => {
        const traitElement = document.createElement('div');
        traitElement.className = `card ${trait.class}`;
        traitElement.dataset.index = index;
        
        // Create quality labels container for multiple qualities
        const qualityLabelsContainer = document.createElement('div');
        qualityLabelsContainer.className = 'quality-labels-container';
        
        // Add a label for each quality
        trait.qualities.forEach(quality => {
            const qualityLabel = document.createElement('div');
            qualityLabel.className = 'quality-label';
            qualityLabel.textContent = quality;
            qualityLabelsContainer.appendChild(qualityLabel);
        });
        
        const iconElement = document.createElement('div');
        iconElement.className = 'trait-icon';
        iconElement.textContent = trait.icon;
        
        const nameElement = document.createElement('div');
        nameElement.className = 'trait-name';
        nameElement.textContent = trait.name;
        
        const descElement = document.createElement('div');
        descElement.className = 'trait-description';
        descElement.textContent = trait.description;
        
        traitElement.appendChild(qualityLabelsContainer);
        traitElement.appendChild(iconElement);
        traitElement.appendChild(nameElement);
        traitElement.appendChild(descElement);
        
        traitElement.addEventListener('click', () => {
            // Remove selected class from all cards
            document.querySelectorAll('#new-trait-options .card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Add selected class to clicked card
            traitElement.classList.add('selected');
            selectedNewTraitIndex = index;
            
            // Check if both selections are made
            checkSelections();
        });
        
        newTraitOptions.appendChild(traitElement);
    });
    
    return crisisTraits;
}

// Check if both trait selections are made
function checkSelections() {
    if (selectedTraitIndex >= 0 && selectedNewTraitIndex >= 0) {
        discardBtn.disabled = false;
    } else {
        discardBtn.disabled = true;
    }
}

// Replace selected trait with new trait
function replaceTrait() {
    if (selectedTraitIndex >= 0 && selectedNewTraitIndex >= 0) {
        // Get the new trait
        const newTraitElements = document.querySelectorAll('#new-trait-options .card');
        const newTraitElement = newTraitElements[selectedNewTraitIndex];
        const newTraitName = newTraitElement.querySelector('.trait-name').textContent;
        
        // Find the trait object
        const newTrait = traits.find(trait => trait.name === newTraitName);
        
        // Replace the trait
        if (newTrait) {
            playerTraits[selectedTraitIndex] = newTrait;
        }
        
        // Hide discard section
        discardSection.classList.add('hidden');
        
        // Update UI
        updateUI();
        
        // Prepare for next round
        currentRound++;
        
        // Reset selection indices
        selectedTraitIndex = -1;
        selectedNewTraitIndex = -1;
        
        // If this was the last round, end the game
        if (currentRound > 10) {
            endGame();
        } else {
            // Start the next round
            startRound();
        }
    }
}

function calculateMindsetDistribution(traits) {
    const distribution = {
        Awareness: 0,
        Behaviour: 0,
        Choice: 0,
        Engage: 0,
        Empower: 0,
        Enable: 0
    };
    
    // Calculate the score for each quality
    traits.forEach(trait => {
        trait.qualities.forEach(quality => {
            distribution[quality]++;
        });
    });
    
    // Normalize scores (convert to percentages)
    const maxPossibleScores = {
        Awareness: 1, // Emotional Intelligence
        Behaviour: 2, // Adaptability, Resilience
        Choice: 3,    // Ethical Integrity, Strategic Thinking, Decisiveness
        Engage: 2,    // Collaboration, Communication
        Empower: 2,   // Transparency, Emotional Intelligence
        Enable: 2     // Conflict Resolution, Resilience
    };
    
    Object.keys(distribution).forEach(quality => {
        distribution[quality] = (distribution[quality] / maxPossibleScores[quality]) * 100;
    });
    
    return distribution;
}

function generateMindsetDescription(distribution) {
    const strengths = [];
    const areasForDevelopment = [];
    
    Object.entries(distribution).forEach(([quality, score]) => {
        if (score >= 50) {
            strengths.push(quality);
        } else {
            areasForDevelopment.push(quality);
        }
    });
    
    let description = `<strong>Your Leadership Strengths:</strong><br>`;
    description += strengths.length > 0 
        ? `Your mindset shows strong alignment with ${strengths.join(', ')}. `
        : `You're still developing your core leadership qualities. `;
    
    description += `<br><br><strong>Development Opportunities:</strong><br>`;
    description += areasForDevelopment.length > 0
        ? `Consider developing your ${areasForDevelopment.join(', ')} qualities to become a more well-rounded leader. `
        : `You have a well-balanced leadership mindset across all qualities. `;
    
    return description;
}

function createRadarChart(distribution) {
    const ctx = document.getElementById('mindsetRadar').getContext('2d');
    
    // Define quality symbols
    const qualitySymbols = {
        'Awareness': '👁️ Awareness',    // Eye for self-awareness
        'Behaviour': '🔄 Behaviour',     // Cycle for adaptable behavior
        'Choice': '⚡ Choice',           // Lightning for decisive choices
        'Engage': '🤝 Engage',          // Handshake for engagement
        'Empower': '⭐ Empower',        // Star for empowerment
        'Enable': '🔑 Enable'           // Key for enabling others
    };
    
    // Destroy existing chart if it exists
    if (window.mindsetChart) {
        window.mindsetChart.destroy();
    }
    
    window.mindsetChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(distribution).map(key => qualitySymbols[key]),
            datasets: [{
                label: 'Your Leadership Mindset',
                data: Object.values(distribution),
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                borderColor: 'rgba(52, 152, 219, 1)',
                pointBackgroundColor: 'rgba(52, 152, 219, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(52, 152, 219, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 16,
                            weight: 'bold'
                        },
                        padding: 20
                    },
                    suggestedMin: 0,
                    suggestedMax: 100,
                    ticks: {
                        stepSize: 20,
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.r.toFixed(1)}%`;
                        }
                    }
                }
            }
        }
    });
}

function endGame() {
    finalScoreElement.textContent = score;
    
    // Calculate mindset distribution
    const distribution = calculateMindsetDistribution(playerTraits);
    
    // Create radar chart
    createRadarChart(distribution);
    
    // Generate and display mindset description
    const mindsetDescription = generateMindsetDescription(distribution);
    document.getElementById('mindset-description').innerHTML = mindsetDescription;
    
    // Determine final message based on score
    let message;
    if (score >= 800) {
        message = "Outstanding leadership! You're a natural crisis manager.";
    } else if (score >= 500) {
        message = "Good leadership skills! With more experience, you'll excel in crisis management.";
    } else if (score >= 300) {
        message = "You have potential, but need to develop your leadership traits further.";
    } else {
        message = "Leadership is challenging. Keep learning and developing your skills.";
    }
    
    finalMessageElement.textContent = message;
    gameOverElement.classList.remove('hidden');
    nextRoundBtn.disabled = true;
}

// Event listeners
nextRoundBtn.addEventListener('click', startRound);
discardBtn.addEventListener('click', replaceTrait);
playAgainBtn.addEventListener('click', initGame);
confirmTraitsBtn.addEventListener('click', startGameWithSelectedTraits);

// Initialize the game when the page loads
window.addEventListener('DOMContentLoaded', initGame);

// Get new trait options for replacement
function getNewTraitOptions() {
    // Get the required traits for the current crisis
    const crisisTraits = [];
    
    // Find the trait objects for each required trait in the current crisis
    currentCrisis.requiredTraits.forEach(traitName => {
        const trait = traits.find(t => t.name === traitName);
        if (trait && !playerTraits.some(playerTrait => playerTrait.name === trait.name)) {
            crisisTraits.push(trait);
        }
    });
    
    // If the player already has some of the required traits, fill in with other traits
    if (crisisTraits.length < 3) {
        const otherTraits = traits.filter(trait => 
            !playerTraits.some(playerTrait => playerTrait.name === trait.name) && 
            !crisisTraits.some(crisisTrait => crisisTrait.name === trait.name)
        );
        
        // Randomly select additional traits to make up 3 options
        while (crisisTraits.length < 3 && otherTraits.length > 0) {
            const randomIndex = Math.floor(Math.random() * otherTraits.length);
            crisisTraits.push(otherTraits[randomIndex]);
            otherTraits.splice(randomIndex, 1);
        }
    }
    
    return crisisTraits;
} 