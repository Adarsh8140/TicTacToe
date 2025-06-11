document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const playerForm = document.getElementById('player-form');
    const gameContainer = document.getElementById('game-container');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const startGameBtn = document.getElementById('start-game');
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const currentRoundElement = document.getElementById('current-round');
    const player1NameElement = document.getElementById('player1-name');
    const player2NameElement = document.getElementById('player2-name');
    const score1Element = document.getElementById('score1');
    const score2Element = document.getElementById('score2');
    const currentPlayerElement = document.getElementById('current-player');
    const roundResult = document.getElementById('round-result');
    const roundWinnerText = document.getElementById('round-winner-text');
    const nextRoundBtn = document.getElementById('next-round');
    const gameResult = document.getElementById('game-result');
    const gameWinnerText = document.getElementById('game-winner-text');
    const playAgainTopBtn = document.getElementById('play-again-top');
    const confettiContainer = document.getElementById('confetti-container');
    const celebrationText = document.getElementById('celebration-text');

    // Game state
    let gameState = {
        player1: '',
        player2: '',
        currentPlayer: '',
        currentPlayerMark: 'X',
        currentRound: 1,
        scores: { player1: 0, player2: 0 },
        board: Array(9).fill(''),
        gameActive: false
    };

    // Winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Event Listeners
    startGameBtn.addEventListener('click', startGame);
    nextRoundBtn.addEventListener('click', setupNextRound);
    playAgainTopBtn.addEventListener('click', restartGame);
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });
    
    // Add event listener for Enter key on input fields
    player1Input.addEventListener('keypress', handleEnterKey);
    player2Input.addEventListener('keypress', handleEnterKey);
    
    // Handle Enter key press
    function handleEnterKey(e) {
        if (e.key === 'Enter') {
            // If player1 input has focus and is filled, move to player2 input
            if (e.target === player1Input && player1Input.value.trim() !== '') {
                player2Input.focus();
            } 
            // If player2 input has focus and both inputs are filled, start the game
            else if (e.target === player2Input && player1Input.value.trim() !== '' && player2Input.value.trim() !== '') {
                startGame();
            }
        }
    }

    // Initialize interactive background
    initInteractiveBackground();

    // Start the game
    function startGame() {
        const player1Name = player1Input.value.trim();
        const player2Name = player2Input.value.trim();
        
        if (!player1Name || !player2Name) {
            alert('Please enter names for both players');
            return;
        }
        
        gameState.player1 = player1Name;
        gameState.player2 = player2Name;
        gameState.currentPlayer = player1Name;
        gameState.currentPlayerMark = 'X';
        gameState.gameActive = true;
        
        // Update UI
        player1NameElement.textContent = player1Name;
        player2NameElement.textContent = player2Name;
        currentPlayerElement.textContent = player1Name;
        
        playerForm.classList.remove('active');
        playerForm.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        gameContainer.classList.add('active');
        
        // Hide the top play again button if it's visible
        playAgainTopBtn.style.display = 'none';
    }

    // Handle cell click
    function handleCellClick(cell) {
        const index = cell.dataset.index;
        
        // Check if cell is already filled or game is not active
        if (gameState.board[index] !== '' || !gameState.gameActive) {
            return;
        }
        
        // Update board state and UI
        gameState.board[index] = gameState.currentPlayerMark;
        cell.textContent = gameState.currentPlayerMark;
        cell.classList.add(gameState.currentPlayerMark.toLowerCase());
        
        // Check for win or draw
        if (checkWin()) {
            handleRoundEnd(true);
        } else if (checkDraw()) {
            handleRoundEnd(false);
        } else {
            // Switch player
            switchPlayer();
        }
    }

    // Check for win
    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState.board[index] === gameState.currentPlayerMark;
            });
        });
    }

    // Check for draw
    function checkDraw() {
        return gameState.board.every(cell => cell !== '');
    }

    // Switch player
    function switchPlayer() {
        gameState.currentPlayer = gameState.currentPlayer === gameState.player1 
            ? gameState.player2 
            : gameState.player1;
        gameState.currentPlayerMark = gameState.currentPlayerMark === 'X' ? 'O' : 'X';
        currentPlayerElement.textContent = gameState.currentPlayer;
    }

    // Handle round end
    function handleRoundEnd(isWin) {
        gameState.gameActive = false;
        
        if (isWin) {
            // Update scores
            if (gameState.currentPlayer === gameState.player1) {
                gameState.scores.player1++;
                score1Element.textContent = gameState.scores.player1;
            } else {
                gameState.scores.player2++;
                score2Element.textContent = gameState.scores.player2;
            }
            
            roundWinnerText.textContent = `${gameState.currentPlayer} wins round ${gameState.currentRound}!`;
            
            // Show celebration effects for round win
            showCelebration(`${gameState.currentPlayer} wins round ${gameState.currentRound}!`);
        } else {
            roundWinnerText.textContent = `Round ${gameState.currentRound} is a draw!`;
        }
        
        // Check if game is over
        if (gameState.scores.player1 === 2 || gameState.scores.player2 === 2 || gameState.currentRound === 3) {
            setTimeout(() => {
                showGameResult();
            }, 2000); // Delay to allow round celebration to finish
        } else {
            setTimeout(() => {
                roundResult.classList.remove('hidden');
                // Ensure the container scrolls to show the button
                roundResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        }
    }

    // Setup next round
    function setupNextRound() {
        gameState.currentRound++;
        gameState.board = Array(9).fill('');
        gameState.gameActive = true;
        gameState.currentPlayer = gameState.player1;
        gameState.currentPlayerMark = 'X';
        
        // Update UI
        currentRoundElement.textContent = gameState.currentRound;
        currentPlayerElement.textContent = gameState.currentPlayer;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        
        roundResult.classList.add('hidden');
    }

    // Show game result
    function showGameResult() {
        let winner;
        
        if (gameState.scores.player1 > gameState.scores.player2) {
            winner = gameState.player1;
        } else if (gameState.scores.player2 > gameState.scores.player1) {
            winner = gameState.player2;
        } else {
            winner = null;
        }
        
        if (winner) {
            gameWinnerText.textContent = `${winner} wins the game!`;
            // Show grand celebration for game win
            showCelebration(`CONGRATULATIONS ${winner}!`, true);
        } else {
            gameWinnerText.textContent = `The game ended in a tie!`;
        }
        
        roundResult.classList.add('hidden');
        gameResult.classList.remove('hidden');
        
        // Show the Play Again button above the container
        setTimeout(() => {
            playAgainTopBtn.style.display = 'block';
        }, 1500);
    }

    // Restart game
    function restartGame() {
        // Reset game state
        gameState = {
            player1: gameState.player1,
            player2: gameState.player2,
            currentPlayer: gameState.player1,
            currentPlayerMark: 'X',
            currentRound: 1,
            scores: { player1: 0, player2: 0 },
            board: Array(9).fill(''),
            gameActive: true
        };
        
        // Update UI
        currentRoundElement.textContent = '1';
        score1Element.textContent = '0';
        score2Element.textContent = '0';
        currentPlayerElement.textContent = gameState.player1;
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
        
        gameResult.classList.add('hidden');
        playAgainTopBtn.style.display = 'none';
    }

    // Show celebration effects
    function showCelebration(message, isGameWin = false) {
        // Display celebration text
        celebrationText.textContent = message;
        celebrationText.style.display = 'block';
        
        // Reset animation
        celebrationText.style.animation = 'none';
        celebrationText.offsetHeight; // Trigger reflow
        celebrationText.style.animation = 'celebration-text 2s ease-in-out forwards';
        
        // Create confetti
        confettiContainer.style.display = 'block';
        confettiContainer.innerHTML = '';
        
        const confettiCount = isGameWin ? 200 : 100;
        const colors = ['#f94144', '#f3722c', '#f8961e', '#f9c74f', '#90be6d', '#43aa8b', '#577590', '#ff99c8', '#9b5de5'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -20 + 'px';
            
            // Random size
            const size = Math.random() * 10 + 5;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';
            
            // Random color
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random shape
            const shapes = ['circle', 'square', 'triangle'];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.backgroundColor = 'transparent';
                confetti.style.borderLeft = size/2 + 'px solid transparent';
                confetti.style.borderRight = size/2 + 'px solid transparent';
                confetti.style.borderBottom = size + 'px solid ' + colors[Math.floor(Math.random() * colors.length)];
            }
            
            // Random animation duration
            const duration = Math.random() * 3 + 2;
            confetti.style.animationDuration = duration + 's';
            
            // Random animation delay
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            confettiContainer.appendChild(confetti);
        }
        
        // Clean up after animation
        setTimeout(() => {
            confettiContainer.style.display = 'none';
        }, 5000);
    }

    // Initialize interactive background
    function initInteractiveBackground() {
        document.addEventListener('mousemove', (e) => {
            const bubbles = document.querySelectorAll('.bubble');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            bubbles.forEach((bubble, index) => {
                const factor = (index % 5) * 0.1;
                const offsetX = (mouseX - 0.5) * 20 * factor;
                const offsetY = (mouseY - 0.5) * 20 * factor;
                
                bubble.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }
});
