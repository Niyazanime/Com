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
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const modeButtons = document.querySelectorAll('.mode-btn');

// Mode 1 Elements
const playerInputs = document.querySelectorAll('.player-input');
const addPlayerBtn = document.getElementById('add-player');
const startMode1Btn = document.getElementById('start-mode1');
const mode1Setup = document.getElementById('mode1-setup');
const mode1Game = document.getElementById('mode1-game');
const playerTurn = document.getElementById('player-turn');
const revealRoleBtn = document.getElementById('reveal-role');
const roleResult = document.getElementById('role-result');
const playerName = document.getElementById('player-name');
const cardImage = document.getElementById('card-image');
const cardImg = document.getElementById('card-img');
const spyResult = document.getElementById('spy-result');
const peacefulResult = document.getElementById('peaceful-result');
const cardName = document.getElementById('card-name');
const nextPlayerBtn = document.getElementById('next-player');
const mode1Discussion = document.getElementById('mode1-discussion');
const showCardListBtn = document.getElementById('show-card-list');
const startVotingBtn = document.getElementById('start-voting');
const mode1Voting = document.getElementById('mode1-voting');
const votingPlayers = document.getElementById('voting-players');
const submitVotesBtn = document.getElementById('submit-votes');
const mode1Results = document.getElementById('mode1-results');
const resultsContent = document.getElementById('results-content');
const restartMode1Btn = document.getElementById('restart-mode1');

// Mode 2 Elements
const hostNameInput = document.getElementById('host-name');
const createRoomBtn = document.getElementById('create-room');
const roomCreated = document.getElementById('room-created');
const roomIdDisplay = document.getElementById('room-id-display');
const roomPlayers = document.getElementById('room-players');
const startRoomGameBtn = document.getElementById('start-room-game');
const joinNameInput = document.getElementById('join-name');
const roomCodeInput = document.getElementById('room-code');
const joinRoomBtn = document.getElementById('join-room');
const joinedRoom = document.getElementById('joined-room');
const joinedPlayers = document.getElementById('joined-players');
const playerRoleInfo = document.getElementById('player-role-info');
const playerRoleContent = document.getElementById('player-role-content');

// Mode 3 Elements
const chatHostNameInput = document.getElementById('chat-host-name');
const createChatRoomBtn = document.getElementById('create-chat-room');
const chatRoomCreated = document.getElementById('chat-room-created');
const chatRoomId = document.getElementById('chat-room-id');
const chatRoomPlayers = document.getElementById('chat-room-players');
const startChatGameBtn = document.getElementById('start-chat-game');
const chatJoinNameInput = document.getElementById('chat-join-name');
const chatRoomCodeInput = document.getElementById('chat-room-code');
const joinChatRoomBtn = document.getElementById('join-chat-room');
const chatJoinedRoom = document.getElementById('chat-joined-room');
const chatJoinedPlayers = document.getElementById('chat-joined-players');
const mode3Setup = document.getElementById('mode3-setup');
const mode3Game = document.getElementById('mode3-game');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send');
const playerRoleText = document.getElementById('player-role-text');
const playerCardText = document.getElementById('player-card-text');
const mode3Voting = document.getElementById('mode3-voting');
const chatVotingPlayers = document.getElementById('chat-voting-players');
const submitChatVoteBtn = document.getElementById('submit-chat-vote');
const mode3Results = document.getElementById('mode3-results');
const chatResultsContent = document.getElementById('chat-results-content');
const showCardsMode3Btn = document.getElementById('show-cards-mode3');

// Modal Elements
const cardsModal = document.getElementById('cards-modal');
const allCardsGrid = document.getElementById('all-cards-grid');
const closeCardsModalBtn = document.getElementById('close-cards-modal');

// Navigation
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
        document.querySelector(`.nav-link[data-page="mode${mode}"]`).classList.add('active');
    });
});

function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    
    // Reset game state when switching pages
    if (pageId === 'home') {
        resetGameState();
    }
}

// Initialize
function init() {
    // Generate cards grid
    generateCardsGrid();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check for existing room in URL
    checkUrlForRoom();
}

function generateCardsGrid() {
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
    // Mode 1
    addPlayerBtn.addEventListener('click', addPlayerInput);
    startMode1Btn.addEventListener('click', startMode1Game);
    revealRoleBtn.addEventListener('click', revealPlayerRole);
    nextPlayerBtn.addEventListener('click', nextPlayerTurn);
    showCardListBtn.addEventListener('click', () => showCardsModal());
    startVotingBtn.addEventListener('click', startVoting);
    submitVotesBtn.addEventListener('click', submitVotes);
    restartMode1Btn.addEventListener('click', restartMode1);
    
    // Mode 2
    createRoomBtn.addEventListener('click', createRoom);
    startRoomGameBtn.addEventListener('click', startRoomGame);
    joinRoomBtn.addEventListener('click', joinRoom);
    
    // Mode 3
    createChatRoomBtn.addEventListener('click', createChatRoom);
    startChatGameBtn.addEventListener('click', startChatGame);
    joinChatRoomBtn.addEventListener('click', joinChatRoom);
    chatSendBtn.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
    submitChatVoteBtn.addEventListener('click', submitChatVote);
    showCardsMode3Btn.addEventListener('click', () => showCardsModal());
    
    // Modal
    closeCardsModalBtn.addEventListener('click', () => {
        cardsModal.classList.add('hidden');
    });
}

function checkUrlForRoom() {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('room');
    const mode = urlParams.get('mode');
    
    if (roomId && mode) {
        if (mode === '2') {
            showPage('mode2');
            roomCodeInput.value = roomId;
            document.querySelector(`.nav-link[data-page="mode2"]`).classList.add('active');
        } else if (mode === '3') {
            showPage('mode3');
            chatRoomCodeInput.value = roomId;
            document.querySelector(`.nav-link[data-page="mode3"]`).classList.add('active');
        }
    }
}

// Mode 1 Functions
function addPlayerInput() {
    const visibleInputs = Array.from(playerInputs).filter(input => !input.classList.contains('hidden'));
    
    if (visibleInputs.length < 5) {
        const nextInput = playerInputs[visibleInputs.length];
        nextInput.classList.remove('hidden');
    }
    
    if (visibleInputs.length === 4) {
        addPlayerBtn.classList.add('hidden');
    }
}

function startMode1Game() {
    const players = [];
    
    playerInputs.forEach(input => {
        if (!input.classList.contains('hidden') && input.value.trim() !== '') {
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
    mode1Setup.classList.add('hidden');
    mode1Game.classList.remove('hidden');
    
    updatePlayerTurn();
}

function updatePlayerTurn() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    playerTurn.textContent = `${currentPlayer.name}, ваша очередь`;
    playerName.textContent = currentPlayer.name;
}

function revealPlayerRole() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    currentPlayer.hasSeenRole = true;
    
    document.getElementById('role-reveal').classList.add('hidden');
    roleResult.classList.remove('hidden');
    
    if (gameState.currentPlayerIndex === gameState.spyIndex) {
        // This player is the spy
        spyResult.classList.remove('hidden');
        peacefulResult.classList.add('hidden');
        cardImg.src = '';
        cardImg.alt = '???';
        cardImage.innerHTML = '???';
    } else {
        // This player is peaceful
        spyResult.classList.add('hidden');
        peacefulResult.classList.remove('hidden');
        cardName.textContent = gameState.card.name;
        cardImg.src = gameState.card.image;
        cardImg.alt = gameState.card.name;
        cardImg.onerror = function() {
            this.style.display = 'none';
            cardImage.innerHTML = gameState.card.name;
        };
    }
}

function nextPlayerTurn() {
    gameState.currentPlayerIndex++;
    
    if (gameState.currentPlayerIndex < gameState.players.length) {
        // More players need to see their roles
        roleResult.classList.add('hidden');
        document.getElementById('role-reveal').classList.remove('hidden');
        updatePlayerTurn();
    } else {
        // All players have seen their roles
        roleResult.classList.add('hidden');
        mode1Discussion.classList.remove('hidden');
    }
}

function startVoting() {
    mode1Discussion.classList.add('hidden');
    mode1Voting.classList.remove('hidden');
    
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
    mode1Voting.classList.add('hidden');
    mode1Results.classList.remove('hidden');
    
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

function restartMode1() {
    // Reset UI
    mode1Results.classList.add('hidden');
    mode1Game.classList.add('hidden');
    mode1Setup.classList.remove('hidden');
    
    // Reset player inputs
    playerInputs.forEach((input, index) => {
        if (index > 2) {
            input.classList.add('hidden');
            input.value = '';
        }
    });
    
    addPlayerBtn.classList.remove('hidden');
    
    // Reset game state
    resetGameState();
}

// Mode 2 Functions
function generateRoomId() {
    return Math.random().toString(36).substring(2, 6).toUpperCase();
}

function createRoom() {
    const hostName = hostNameInput.value.trim();
    
    if (!hostName) {
        a
