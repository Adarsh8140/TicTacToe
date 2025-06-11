# Tic Tac Toe Game

A responsive and interactive 2-player Tic Tac Toe game with multiple rounds, player scoring, and celebratory effects.

![Tic Tac Toe Game](https://example.com/tic-tac-toe-preview.png)

## Features

### Game Mechanics

- **2-Player Gameplay**: Enter player names before starting
- **3-Round System**: Play up to 3 rounds to determine the winner
- **Early Win Detection**: Game ends if a player wins the first 2 rounds
- **Tiebreaker Round**: Third round acts as a tiebreaker when needed
- **Score Tracking**: Keeps track of each player's wins

### User Interface

- **Responsive Design**: Works on both desktop and mobile devices
- **Interactive Background**: Floating bubbles that respond to mouse movement
- **Cardboard Texture**: Realistic cardboard-like game board
- **Player Turn Indicator**: Clearly shows whose turn it is
- **Round Information**: Displays current round and scores

### Visual Effects

- **Celebration Effects**: Confetti shower when a player wins a round or the game
- **Congratulation Messages**: Dynamic messages for round and game winners
- **Animated Player Names**: Subtle glow animation for player names
- **Interactive Elements**: Hover and click animations for game pieces

### User Experience

- **Keyboard Support**: Press Enter to navigate through name inputs and start the game
- **Floating Play Again Button**: Appears above the board when the game ends
- **Auto-scrolling**: Ensures buttons are always visible after round completion
- **Visual Feedback**: Clear indication of X and O marks with different colors

## How to Play

1. **Enter Player Names**:

   - Type names for Player 1 (X) and Player 2 (O)
   - Press Enter or click "Start Game"

2. **Game Rules**:

   - Players take turns placing their mark (X or O) on the board
   - First player to get 3 of their marks in a row (horizontally, vertically, or diagonally) wins the round
   - Win 2 rounds to win the game
   - If each player wins 1 round, the third round acts as a tiebreaker

3. **After Each Round**:

   - The round winner is announced with celebration effects
   - Click "Next Round" to continue to the next round

4. **Game End**:
   - After 3 rounds or when a player wins 2 rounds, the game winner is announced
   - A "Play Again" button appears above the board to restart the game

## Technical Details

### File Structure

- `index.html`: Main HTML structure
- `styles.css`: CSS styling and animations
- `script.js`: Game logic and interactive features

### Technologies Used

- HTML5
- CSS3 (with animations and responsive design)
- Vanilla JavaScript (no external libraries)

### Browser Compatibility

- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design adapts to different screen sizes
- Touch-friendly for mobile devices

## Installation and Setup

1. **Clone or download the repository**:

   ```
   git clone https://github.com/yourusername/tic-tac-toe.git
   ```

2. **Open the game**:
   - Navigate to the project directory
   - Open `index.html` in your web browser

No server or build process required - the game runs entirely in the browser!

## Customization

You can easily customize the game by modifying:

- **Colors**: Edit the CSS variables in `styles.css`
- **Game Rules**: Adjust round count or win conditions in `script.js`
- **Animations**: Modify the animation parameters in `styles.css`
- **Celebration Effects**: Change confetti colors and behavior in `script.js`

## Credits

- Developed by [Adarsh Pandey]
