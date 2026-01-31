// Game Data - все карты с твоими изображениями
const cards = [
    { name: "Торнадо", image: "tornado.webp" },
    { name: "Клонировать", image: "clone.webp" },
    { name: "Бревно", image: "the_log.webp" },
    { name: "Варварская бочка", image: "barbarian_barrel.webp" },
    { name: "Гоблин бочка", image: "goblin_barrel.webp" },
    { name: "Огненный шар", image: "fireball.webp" },
    { name: "Гигантский снежок", image: "giant_snowball.webp" },
    { name: "Королевская доставка", image: "royal_delivery.webp" },
    { name: "Стрелки", image: "arrows.webp" },
    { name: "Зап", image: "zap.webp" },
    { name: "Арбалет", image: "x_bow.webp" },
    { name: "Гоблин сверло", image: "goblin_drill.webp" },
    { name: "Печь", image: "furnace.webp" },
    { name: "Клетка для гоблинов", image: "goblin_cage.webp" },
    { name: "Сборщик эликсира", image: "elixir_collector.webp" },
    { name: "Надгробная плита", image: "tombstone.webp" },
    { name: "Бомбовая башня", image: "bomb_tower.webp" },
    { name: "Хижина варвара", image: "barbarian_hut.webp" },
    { name: "Хижина гоблинов", image: "goblin_hut.webp" },
    { name: "Инфернальная башня", image: "inferno_tower.webp" },
    { name: "Миномёт", image: "mortar.webp" },
    { name: "Тесла", image: "tesla.webp" },
    { name: "Босс бандит", image: "boss_bandit.webp" },
    { name: "Пушка", image: "cannon.webp" },
    { name: "Маленький принц", image: "little_prince.webp" },
    { name: "Гоблинский", image: "goblinstein.webp" },
    { name: "Золотой рыцарь", image: "golden_knight.webp" },
    { name: "Монах", image: "monk.webp" },
    { name: "Король скелетов", image: "skeleton_king.webp" },
    { name: "Лучница королева", image: "archer_queen.webp" },
    { name: "Дух императрицы", image: "spirit_empress.webp" },
    { name: "Могучий шахтёр", image: "mighty_miner.webp" },
    { name: "Феникс", image: "pheonix.webp" },
    { name: "Гоблин машина", image: "goblin_machine.webp" },
    { name: "Волшебный лучник", image: "magic_archer.webp" },
    { name: "Мать ведьма", image: "mother_witch.webp" },
    { name: "Мега рыцарь", image: "mega_knight.webp" },
    { name: "Рыбак", image: "fisherman.webp" },
    { name: "Королевское привидение", image: "royal_ghost.webp" },
    { name: "Наездница на баране", image: "ram_rider.webp" },
    { name: "Бандит", image: "bandit.webp" },
    { name: "Ночная ведьма", image: "night_witch.webp" },
    { name: "Инфернальный дракон", image: "inferno_dragon.webp" },
    { name: "Электро волшебник", image: "electro_wizard.webp" },
    { name: "Искрящий", image: "sparky.webp" },
    { name: "Лесоруб", image: "lumberjack.webp" },
    { name: "Лава-гончая", image: "lava_hound.webp" },
    { name: "Шахтёр", image: "miner.webp" },
    { name: "Ледяной волшебник", image: "ice_wizard.webp" },
    { name: "Принцесса", image: "princess.webp" },
    { name: "Электро гигант", image: "electro_giant.webp" },
    { name: "Рунный гигант", image: "rune_giant.webp" },
    { name: "Гоблин великан", image: "goblin_giant.webp" },
    { name: "Электро дракон", image: "electro_dragon.webp" },
    { name: "Пушка-тележка", image: "cannon_cart.webp" },
    { name: "Разрушители стен", image: "wall_breakers.webp" },
    { name: "Охотник", image: "hunter.webp" },
    { name: "Палач", image: "executioner.webp" },
    { name: "Котёл", image: "bowler.webp" },
    { name: "Тёмный принц", image: "dark_prince.webp" },
    { name: "Охранники", image: "guards.webp" },
    { name: "Гигантский скелет", image: "giant_skeleton.webp" },
    { name: "Принц", image: "prince.webp" }
];

// Game State
let gameState = {
    mode: null,
    players: [],
    spyIndex: -1,
    card: null,
    currentPlayerIndex: 0,
    gameStarted: false,
    roomId: null,
    voting: false,
    votes: {}
};

// Local Storage Management
const storage = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    },
    
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    
    remove: (key) => {
        localStorage.removeItem(key);
    },
    
    // For rooms
    getRoom: (roomId) => {
        return storage.get(`cr_spy_room_${roomId}`);
    },
    
    setRoom: (roomId, data) => {
        storage.set(`cr_spy_room_${roomId}`, data);
    },
    
    removeRoom: (roomId) => {
        storage.remove(`cr_spy_room_${roomId}`);
    },
    
    // For chat messages
    getMessages: (roomId) => {
        return storage.get(`cr_spy_messages_${roomId}`) || [];
    },
    
    addMessage: (roomId, message) => {
        const messages = storage.getMessages(roomId);
        messages.push(message);
        storage.set(`cr_spy_messages_${roomId}`, messages.slice(-50)); // Keep last 50 messages
    },
    
    clearMessages: (roomId) => {
        storage.remove(`cr_spy_messages_${roomId}`);
    }
};

// DOM Elements
let pages, navLinks, modeButtons;
let playerInputs, addPlayerBtn, startMode1Btn, mode1Setup, mode1Game;
let playerTurn, revealRoleBtn, roleResult, playerName, cardImage, cardImg;
let spyResult, peacefulResult, cardNameElement, nextPlayerBtn, mode1Discussion;
let showCardListBtn, startVotingBtn, mode1Voting, votingPlayers, submitVotesBtn;
let mode1Results, resultsContent, restartMode1Btn;

// Initialize DOM elements after page load
function initDOMElements() {
    pages = document.querySelectorAll('.page');
    navLinks = document.querySelectorAll('.nav-link');
    modeButtons = document.querySelectorAll('.mode-btn');

    // Mode 1 Elements
    playerInputs = document.querySelectorAll('.player-input');
    addPlayerBtn = document.getElementById('add-player');
    startMode1Btn = document.getElementById('start-mode1');
    mode1Setup = document.getElementById('mode1-setup');
    mode1Game = document.getElementById('mode1-game');
    playerTurn = document.getElementById('player-turn');
    revealRoleBtn = document.getElementById('reveal-role');
    roleResult = document.getElementById('role-result');
    playerName = document.getElementById('player-name');
    cardImage = document.getElementById('card-image');
    cardImg = document.getElementById('card-img');
    spyResult = document.getElementById('spy-result');
    peacefulResult = document.getElementById('peaceful-result');
    cardNameElement = document.getElementById('card-name');
    nextPlayerBtn = document.getElementById('next-player');
    mode1Discussion = document.getElementById('mode1-discussion');
    showCardListBtn = document.getElementById('show-card-list');
    startVotingBtn = document.getElementById('start-voting');
    mode1Voting = document.getElementById('mode1-voting');
    votingPlayers = document.getElementById('voting-players');
    submitVotesBtn = document.getElementById('submit-votes');
    mode1Results = document.getElementById('mode1-results');
    resultsContent = document.getElementById('results-content');
    restartMode1Btn = document.getElementById('restart-mode1');
}

// Navigation
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.getAttribute('data-mode');
            showPage(`mode${mode}`);
            
            navLinks.forEach(l => l.classList.remove('active'));
            const navLink = document.querySelector(`.nav-link[data-page="mode${mode}"]`);
            if (navLink) {
                navLink.classList.add('active');
            }
        });
    });
}

function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
    
    // Reset game state when switching pages
    if (pageId === 'home') {
        resetGameState();
    }
}

// Initialize
function init() {
    console.log('Initializing game...');
    initDOMElements();
    
    // Generate cards grid
    generateCardsGrid();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check for existing room in URL
    checkUrlForRoom();
    
    console.log('Game initialized successfully');
}

function generateCardsGrid() {
    const allCardsGrid = document.getElementById('all-cards-grid');
    if (!allCardsGrid) return;
    
    allCardsGrid.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card-item';
        cardElement.innerHTML = `
            <div class="card-image">
                <img src="${card.image}" alt="${card.name}" onerror="this.onerror=null; this.parentElement.innerHTML='${card.name}'">
            </div>
            <div class="card-name">${card.name}</div>
        `;
        
        allCardsGrid.appendChild(cardElement);
    });
}

function setupEventListeners() {
    setupNavigation();
    
    // Mode 1
    if (addPlayerBtn) {
        addPlayerBtn.addEventListener('click', addPlayerInput);
    }
    
    if (startMode1Btn) {
        startMode1Btn.addEventListener('click', startMode1Game);
    }
    
    if (revealRoleBtn) {
        revealRoleBtn.addEventListener('click', revealPlayerRole);
    }
    
    if (nextPlayerBtn) {
        nextPlayerBtn.addEventListener('click', nextPlayerTurn);
    }
    
    if (showCardListBtn) {
        showCardListBtn.addEventListener('click', () => showCardsModal());
    }
    
    if (startVotingBtn) {
        startVotingBtn.addEventListener('click', startVoting);
    }
    
    if (submitVotesBtn) {
        submitVotesBtn.addEventListener('click', submitVotes);
    }
    
    if (restartMode1Btn) {
        restartMode1Btn.addEventListener('click', restartMode1);
    }
    
    // Mode 2
    const hostNameInput = document.getElementById('host-name');
    const createRoomBtn = document.getElementById('create-room');
    const startRoomGameBtn = document.getElementById('start-room-game');
    const joinNameInput = document.getElementById('join-name');
    const roomCodeInput = document.getElementById('room-code');
    const joinRoomBtn = document.getElementById('join-room');
    
    if (createRoomBtn) {
        createRoomBtn.addEventListener('click', () => {
            const hostName = hostNameInput ? hostNameInput.value.trim() : '';
            if (!hostName) {
                alert('Введите ваше имя');
                return;
            }
            createRoom(hostName);
        });
    }
    
    if (startRoomGameBtn) {
        startRoomGameBtn.addEventListener('click', startRoomGame);
    }
    
    if (joinRoomBtn) {
        joinRoomBtn.addEventListener('click', () => {
            const playerName = joinNameInput ? joinNameInput.value.trim() : '';
            const roomId = roomCodeInput ? roomCodeInput.value.trim().toUpperCase() : '';
            joinRoom(playerName, roomId);
        });
    }
    
    // Mode 3
    const chatHostNameInput = document.getElementById('chat-host-name');
    const createChatRoomBtn = document.getElementById('create-chat-room');
    const startChatGameBtn = document.getElementById('start-chat-game');
    const chatJoinNameInput = document.getElementById('chat-join-name');
    const chatRoomCodeInput = document.getElementById('chat-room-code');
    const joinChatRoomBtn = document.getElementById('join-chat-room');
    const chatSendBtn = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    const submitChatVoteBtn = document.getElementById('submit-chat-vote');
    const showCardsMode3Btn = document.getElementById('show-cards-mode3');
    
    if (createChatRoomBtn) {
        createChatRoomBtn.addEventListener('click', () => {
            const hostName = chatHostNameInput ? chatHostNameInput.value.trim() : '';
            if (!hostName) {
                alert('Введите ваше имя');
                return;
            }
            createChatRoom(hostName);
        });
    }
    
    if (startChatGameBtn) {
        startChatGameBtn.addEventListener('click', startChatGame);
    }
    
    if (joinChatRoomBtn) {
        joinChatRoomBtn.addEventListener('click', () => {
            const playerName = chatJoinNameInput ? chatJoinNameInput.value.trim() : '';
            const roomId = chatRoomCodeInput ? chatRoomCodeInput.value.trim().toUpperCase() : '';
            joinChatRoom(playerName, roomId);
        });
    }
    
    if (chatSendBtn) {
        chatSendBtn.addEventListener('click', sendChatMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }
    
    if (submitChatVoteBtn) {
        submitChatVoteBtn.addEventListener('click', submitChatVote);
    }
    
    if (showCardsMode3Btn) {
        showCardsMode3Btn.addEventListener('click', () => showCardsModal());
    }
    
    // Modal
    const closeCardsModalBtn = document.getElementById('close-cards-modal');
    if (closeCardsModalBtn) {
        closeCardsModalBtn.addEventListener('click', () => {
            const cardsModal = document.getElementById('cards-modal');
            if (cardsModal) {
                cardsModal.classList.add('hidden');
            }
        });
    }
}

function checkUrlForRoom() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    const mode = urlParams.get('mode');
    
    if (roomId && mode) {
        if (mode === '2') {
            showPage('mode2');
            const roomCodeInput = document.getElementById('room-code');
            if (roomCodeInput) {
                roomCodeInput.value = roomId;
            }
            const navLink = document.querySelector('.nav-link[data-page="mode2"]');
            if (navLink) {
                navLink.classList.add('active');
            }
        } else if (mode === '3') {
            showPage('mode3');
            const chatRoomCodeInput = document.getElementById('chat-room-code');
            if (chatRoomCodeInput) {
                chatRoomCodeInput.value = roomId;
            }
            const navLink = document.querySelector('.nav-link[data-page="mode3"]');
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    }
}

// Mode 1 Functions
function addPlayerInput() {
    const visibleInputs = Array.from(playerInputs).filter(input => !input.classList.contains('hidden'));
    
    if (visibleInputs.length < 5) {
        const nextInput = playerInputs[visibleInputs.length];
        if (nextInput) {
            nextInput.classList.remove('hidden');
        }
    }
    
    if (visibleInputs.length === 4) {
        addPlayerBtn.classList.add('hidden');
    }
}

function startMode1Game() {
    const players = [];
    
    playerInputs.forEach(input => {
        if (input && !input.classList.contains('hidden') && input.value.trim() !== '') {
            players.push({
                name: input.value.trim(),
                isSpy: false,
                hasSeenRole: false
            });
        }
    });
    
    if (players.length < 3 || players.length > 5) {
        alert('Для игры нужно от 3 до 5 игроков');
        return;
    }
    
    // Select random card
    const cardIndex = Math.floor(Math.random() * cards.length);
    const selectedCard = cards[cardIndex];
    
    // Select random spy
    const spyIndex = Math.floor(Math.random() * players.length);
    
    // Update game state
    gameState.mode = 1;
    gameState.players = players;
    gameState.spyIndex = spyIndex;
    gameState.card = selectedCard;
    gameState.currentPlayerIndex = 0;
    gameState.gameStarted = true;
    
    // Update UI
    if (mode1Setup) mode1Setup.classList.add('hidden');
    if (mode1Game) mode1Game.classList.remove('hidden');
    
    updatePlayerTurn();
}

function updatePlayerTurn() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (playerTurn) playerTurn.textContent = `${currentPlayer.name}, ваша очередь`;
    if (playerName) playerName.textContent = currentPlayer.name;
}

function revealPlayerRole() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    currentPlayer.hasSeenRole = true;
    
    const roleReveal = document.getElementById('role-reveal');
    if (roleReveal) roleReveal.classList.add('hidden');
    if (roleResult) roleResult.classList.remove('hidden');
    
    if (gameState.currentPlayerIndex === gameState.spyIndex) {
        // This player is the spy
        if (spyResult) spyResult.classList.remove('hidden');
        if (peacefulResult) peacefulResult.classList.add('hidden');
        if (cardImg) {
            cardImg.src = '';
            cardImg.alt = '???';
        }
        if (cardImage) {
            cardImage.innerHTML = '???';
        }
    } else {
        // This player is peaceful
        if (spyResult) spyResult.classList.add('hidden');
        if (peacefulResult) peacefulResult.classList.remove('hidden');
        if (cardNameElement) cardNameElement.textContent = gameState.card.name;
        if (cardImg) {
            cardImg.src = gameState.card.image;
            cardImg.alt = gameState.card.name;
            cardImg.onerror = function() {
                this.style.display = 'none';
                if (cardImage) {
                    cardImage.innerHTML = gameState.card.name;
                }
            };
        }
    }
}

function nextPlayerTurn() {
    gameState.currentPlayerIndex++;
    
    if (gameState.currentPlayerIndex < gameState.players.length) {
        // More players need to see their roles
        if (roleResult) roleResult.classList.add('hidden');
        const roleReveal = document.getElementById('role-reveal');
        if (roleReveal) roleReveal.classList.remove('hidden');
        updatePlayerTurn();
    } else {
        // All players have seen their roles
        if (roleResult) roleResult.classList.add('hidden');
        if (mode1Discussion) mode1Discussion.classList.remove('hidden');
    }
}

function startVoting() {
    if (mode1Discussion) mode1Discussion.classList.add('hidden');
    if (mode1Voting) mode1Voting.classList.remove('hidden');
    
    if (votingPlayers) {
        votingPlayers.innerHTML = '';
        
        gameState.players.forEach((player, index) => {
            const playerElement = document.createElement('div');
            playerElement.className = 'player-item';
            playerElement.innerHTML = `
                <div class="player-avatar">${player.name.charAt(0)}</div>
                <div class="player-name">${player.name}</div>
                <select class="player-role vote-select" data-player-index="${index}">
                    <option value="">Не голосовал</option>
                    ${gameState.players.map((p, i) => `
                        <option value="${i}">${p.name}</option>
                    `).join('')}
                </select>
            `;
            
            votingPlayers.appendChild(playerElement);
        });
    }
    
    // Initialize votes
    gameState.votes = {};
}

function submitVotes() {
    const voteSelects = document.querySelectorAll('.vote-select');
    let votes = {};
    
    // Count votes
    voteSelects.forEach(select => {
        const voterIndex = parseInt(select.getAttribute('data-player-index'));
        const votedIndex = parseInt(select.value);
        
        if (!isNaN(votedIndex)) {
            if (!votes[votedIndex]) votes[votedIndex] = 0;
            votes[votedIndex]++;
        }
    });
    
    // Find player with most votes
    let maxVotes = 0;
    let suspectedSpyIndex = -1;
    
    Object.keys(votes).forEach(playerIndex => {
        if (votes[playerIndex] > maxVotes) {
            maxVotes = votes[playerIndex];
            suspectedSpyIndex = parseInt(playerIndex);
        }
    });
    
    // Determine result
    const isSpyFound = suspectedSpyIndex === gameState.spyIndex;
    const spyPlayer = gameState.players[gameState.spyIndex];
    
    // Display results
    if (mode1Voting) mode1Voting.classList.add('hidden');
    if (mode1Results) mode1Results.classList.remove('hidden');
    
    if (resultsContent) {
        let resultHTML = `
            <div class="role-reveal">
                <h3 class="role-title">${isSpyFound ? 'Мирные игроки победили!' : 'Шпион победил!'}</h3>
                <p>Карта была: <strong>${gameState.card.name}</strong></p>
                <div class="role-image">
                    <img src="${gameState.card.image}" alt="${gameState.card.name}" onerror="this.onerror=null; this.parentElement.innerHTML='${gameState.card.name}'">
                </div>
                <p>Шпионом был: <strong>${spyPlayer.name}</strong></p>
            </div>
            
            <h4 class="mt-30">Результаты голосования:</h4>
        `;
        
        gameState.players.forEach((player, index) => {
            const voteCount = votes[index] || 0;
            const isSpy = index === gameState.spyIndex;
            
            resultHTML += `
                <div class="player-item ${isSpy ? 'glow' : ''}">
                    <div class="player-avatar">${player.name.charAt(0)}</div>
                    <div class="player-name">${player.name} ${isSpy ? '(Шпион)' : ''}</div>
                    <div class="player-role">${voteCount} голосов</div>
                </div>
            `;
        });
        
        resultsContent.innerHTML = resultHTML;
    }
}

function restartMode1() {
    // Reset UI
    if (mode1Results) mode1Results.classList.add('hidden');
    if (mode1Game) mode1Game.classList.add('hidden');
    if (mode1Setup) mode1Setup.classList.remove('hidden');
    
    // Reset player inputs
    playerInputs.forEach((input, index) => {
        if (input) {
            if (index > 2) {
                input.classList.add('hidden');
                input.value = '';
            }
        }
    });
    
    if (addPlayerBtn) {
        addPlayerBtn.classList.remove('hidden');
    }
    
    // Reset game state
    resetGameState();
}

// Mode 2 Functions
function generateRoomId() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function createRoom(hostName) {
    const roomId = generateRoomId();
    
    // Create room data
    const roomData = {
        id: roomId,
        mode: 2,
        host: hostName,
        players: [{ name: hostName, isSpy: false, hasJoined: true }],
        gameStarted: false,
        card: null,
        spyIndex: -1
    };
    
    // Save to storage
storage.setRoom(roomId, roomData);
    
    // Update UI
    const roomIdDisplay = document.getElementById('room-id-display');
    const roomCreated = document.getElementById('room-created');
    
    if (roomIdDisplay) roomIdDisplay.textContent = roomId;
    if (roomCreated) roomCreated.classList.remove('hidden');
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('room', roomId);
    url.searchParams.set('mode', '2');
    window.history.pushState({}, '', url);
    
    // Update players list
    updateRoomPlayers(roomId, 'room-players');
    
    // Store player info
    localStorage.setItem('cr_player_name', hostName);
    localStorage.setItem('cr_room_id', roomId);
    
    // Start polling for updates
    pollRoomUpdates(roomId);
}

function joinRoom(playerName, roomId) {
    if (!playerName || !roomId) {
        alert('Введите имя и ID комнаты');
        return;
    }
    
    const roomData = storage.getRoom(roomId);
    
    if (!roomData) {
        alert('Комната не найдена');
        return;
    }
    
    if (roomData.gameStarted) {
        alert('Игра уже началась');
        return;
    }
    
    // Check if player already exists
    const existingPlayer = roomData.players.find(p => p.name === playerName);
    
    if (!existingPlayer) {
        // Add player to room
        roomData.players.push({ 
            name: playerName, 
            isSpy: false, 
            hasJoined: true 
        });
        
        storage.setRoom(roomId, roomData);
    }
    
    // Update UI
    const joinedRoom = document.getElementById('joined-room');
    if (joinedRoom) joinedRoom.classList.remove('hidden');
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('room', roomId);
    url.searchParams.set('mode', '2');
    window.history.pushState({}, '', url);
    
    // Update players list
    updateRoomPlayers(roomId, 'joined-players');
    
    // Store player info
    localStorage.setItem('cr_player_name', playerName);
    localStorage.setItem('cr_room_id', roomId);
    
    // Start polling for updates
    pollRoomUpdates(roomId);
}

function startRoomGame() {
    const roomIdDisplay = document.getElementById('room-id-display');
    if (!roomIdDisplay) return;
    
    const roomId = roomIdDisplay.textContent;
    const roomData = storage.getRoom(roomId);
    
    if (!roomData || roomData.players.length < 3) {
        alert('Для начала игры нужно минимум 3 игрока');
        return;
    }
    
    // Select random card
    const cardIndex = Math.floor(Math.random() * cards.length);
    roomData.card = cards[cardIndex];
    
    // Select random spy
    roomData.spyIndex = Math.floor(Math.random() * roomData.players.length);
    
    // Mark game as started
    roomData.gameStarted = true;
    
    // Update player roles
    roomData.players.forEach((player, index) => {
        player.isSpy = index === roomData.spyIndex;
    });
    
    // Save room data
    storage.setRoom(roomId, roomData);
    
    // Update UI for host
    const roomPlayers = document.getElementById('room-players');
    const startRoomGameBtn = document.getElementById('start-room-game');
    const playerRoleInfo = document.getElementById('player-role-info');
    const playerRoleContent = document.getElementById('player-role-content');
    
    if (roomPlayers) {
        roomPlayers.innerHTML = '';
        
        roomData.players.forEach((player, index) => {
            const playerElement = document.createElement('div');
            playerElement.className = 'player-item';
            playerElement.innerHTML = `
                <div class="player-avatar">${player.name.charAt(0)}</div>
                <div class="player-name">${player.name}</div>
                <div class="player-role">${player.isSpy ? 'Шпион' : 'Мирный'}</div>
            `;
            
            roomPlayers.appendChild(playerElement);
        });
    }
    
    // Show role for host
    const hostPlayer = roomData.players[0];
    if (playerRoleInfo) playerRoleInfo.classList.remove('hidden');
    
    if (playerRoleContent) {
        if (hostPlayer.isSpy) {
            playerRoleContent.innerHTML = `
                <div class="role-spy">Вы шпион!</div>
                <p>Вы не знаете, какая карта у мирных игроков. Слушайте вопросы и пытайтесь угадать карту.</p>
            `;
        } else {
            playerRoleContent.innerHTML = `
                <p class="role-card">Ваша карта: <strong>${roomData.card.name}</strong></p>
                <div class="role-image">
                    <img src="${roomData.card.image}" alt="${roomData.card.name}" onerror="this.onerror=null; this.parentElement.innerHTML='${roomData.card.name}'">
                </div>
                <p>Вы мирный игрок. Задавайте вопросы, чтобы вычислить шпиона.</p>
            `;
        }
    }
    
    // Disable start button
    if (startRoomGameBtn) {
        startRoomGameBtn.disabled = true;
        startRoomGameBtn.textContent = 'Игра началась';
    }
}

function updateRoomPlayers(roomId, elementId) {
    const roomData = storage.getRoom(roomId);
    
    if (!roomData) return;
    
    const playersList = document.getElementById(elementId);
    if (!playersList) return;
    
    playersList.innerHTML = '';
    
    roomData.players.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = 'player-item';
        playerElement.innerHTML = `
            <div class="player-avatar">${player.name.charAt(0)}</div>
            <div class="player-name">${player.name}</div>
            ${roomData.gameStarted ? `
                <div class="player-role">${player.isSpy ? 'Шпион' : 'Мирный'}</div>
            ` : ''}
        `;
        
        playersList.appendChild(playerElement);
    });
    
    // For joined players, show their role if game has started
    if (elementId === 'joined-players' && roomData.gameStarted) {
        const playerName = localStorage.getItem('cr_player_name');
        const playerRoleInfo = document.getElementById('player-role-info');
        const playerRoleContent = document.getElementById('player-role-content');
        const player = roomData.players.find(p => p.name === playerName);
        
        if (player && playerRoleInfo && playerRoleContent) {
            playerRoleInfo.classList.remove('hidden');
            
            if (player.isSpy) {
                playerRoleContent.innerHTML = `
                    <div class="role-spy">Вы шпион!</div>
                    <p>Вы не знаете, какая карта у мирных игроков. Слушайте вопросы и пытайтесь угадать карту.</p>
                `;
            } else {
                playerRoleContent.innerHTML = `
                <p class="role-card">Ваша карта: <strong>${roomData.card.name}</strong></p>
                    <div class="role-image">
                        <img src="${roomData.card.image}" alt="${roomData.card.name}" onerror="this.onerror=null; this.parentElement.innerHTML='${roomData.card.name}'">
                    </div>
                    <p>Вы мирный игрок. Задавайте вопросы, чтобы вычислить шпиона.</p>
                `;
            }
        }
    }
}

function pollRoomUpdates(roomId) {
    // Poll for room updates every 3 seconds
    setInterval(() => {
        updateRoomPlayers(roomId, 'room-players');
        updateRoomPlayers(roomId, 'joined-players');
    }, 3000);
}

// Mode 3 Functions (simplified for now)
function createChatRoom(hostName) {
    const roomId = generateRoomId();
    
    // Create room data
    const roomData = {
        id: roomId,
        mode: 3,
        host: hostName,
        players: [{ name: hostName, isSpy: false, hasJoined: true }],
        gameStarted: false,
        card: null,
        spyIndex: -1,
        voting: false,
        votes: {}
    };
    
    // Save to storage
    storage.setRoom(roomId, roomData);
    
    // Update UI
    const chatRoomId = document.getElementById('chat-room-id');
    const chatRoomCreated = document.getElementById('chat-room-created');
    
    if (chatRoomId) chatRoomId.textContent = roomId;
    if (chatRoomCreated) chatRoomCreated.classList.remove('hidden');
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('room', roomId);
    url.searchParams.set('mode', '3');
    window.history.pushState({}, '', url);
    
    // Update players list
    updateChatRoomPlayers(roomId, 'chat-room-players');
    
    // Store player info
    localStorage.setItem('cr_chat_player_name', hostName);
    localStorage.setItem('cr_chat_room_id', roomId);
    
    // Start polling for updates
    pollChatRoomUpdates(roomId);
}

function joinChatRoom(playerName, roomId) {
    if (!playerName || !roomId) {
        alert('Введите имя и ID комнаты');
        return;
    }
    
    const roomData = storage.getRoom(roomId);
    
    if (!roomData) {
        alert('Комната не найдена');
        return;
    }
    
    if (roomData.gameStarted) {
        alert('Игра уже началась');
        return;
    }
    
    // Check if player already exists
    const existingPlayer = roomData.players.find(p => p.name === playerName);
    
    if (!existingPlayer) {
        // Add player to room
        roomData.players.push({ 
            name: playerName, 
            isSpy: false, 
            hasJoined: true 
        });
        
        storage.setRoom(roomId, roomData);
    }
    
    // Update UI
    const chatJoinedRoom = document.getElementById('chat-joined-room');
    if (chatJoinedRoom) chatJoinedRoom.classList.remove('hidden');
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('room', roomId);
    url.searchParams.set('mode', '3');
    window.history.pushState({}, '', url);
    
    // Update players list
    updateChatRoomPlayers(roomId, 'chat-joined-players');
    
    // Store player info
    localStorage.setItem('cr_chat_player_name', playerName);
    localStorage.setItem('cr_chat_room_id', roomId);
}

function updateChatRoomPlayers(roomId, elementId) {
    const roomData = storage.getRoom(roomId);
    
    if (!roomData) return;
    
    const playersList = document.getElementById(elementId);
    
    if (!playersList) return;
    
    playersList.innerHTML = '';
    
    roomData.players.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = 'player-item';
        playerElement.innerHTML = `
            <div class="player-avatar">${player.name.charAt(0)}</div>
            <div class="player-name">${player.name}</div>
            ${roomData.gameStarted ? `
                <div class="player-role">${player.isSpy ? 'Шпион' : 'Мирный'}</div>
            ` : ''}
        `;
        
        playersList.appendChild(playerElement);
    });
}

function showCardsModal() {
    const cardsModal = document.getElementById('cards-modal');
    if (cardsModal) {
        cardsModal.classList.remove('hidden');
    }
}

function resetGameState() {
    gameState = {
        mode: null,
        players: [],
        spyIndex: -1,
        card: null,
        currentPlayerIndex: 0,
        gameStarted: false,
        roomId: null,
        voting: false,
        votes: {}
    };
}

// Mode 3 Chat Functions (simplified for now)
function sendChatMessage() {
    // Simplified - will be implemented fully later
    alert('Чат режима 3 будет полностью реализован в следующей версии');
}

function submitChatVote() {
    // Simplified - will be implemented fully later
    alert('Голосование в режиме 3 будет полностью реализовано в следующей версии');
}

// Start the game when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
```
