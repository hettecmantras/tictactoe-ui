import { useMemo, useState } from 'react'
import './App.css'

const winLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('X')

  const winning = useMemo(() => {
    for (const line of winLines) {
      const [a, b, c] = line
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line }
      }
    }
    return null
  }, [board])

  const isDraw = !winning && board.every(Boolean)

  const statusMessage = winning
    ? `Winner: ${winning.winner} — and the crowd goes wild!`
    : isDraw
      ? "It’s a draw. Reset to keep the streak alive."
      : `Next move: ${currentPlayer}`

  const handleSquareClick = (index) => {
    if (winning || isDraw || board[index]) return
    setBoard((prevBoard) => {
      const nextBoard = prevBoard.slice()
      nextBoard[index] = currentPlayer
      return nextBoard
    })
    setCurrentPlayer((prev) => (prev === 'X' ? 'O' : 'X'))
  }

  const resetBoard = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
  }

  const activeX = board.filter((cell) => cell === 'X').length
  const activeO = board.filter((cell) => cell === 'O').length

  return (
    <div className="app-shell">
      <div className="game-card">
        <div className="glow" aria-hidden="true" />
        <header className="game-header">
          <p className="tagline">Neon arena · purely UI</p>
          <h1>Radiant Tic-Tac-Toe</h1>
          <p className="status" aria-live="polite">{statusMessage}</p>
        </header>

        <section className="board-wrapper">
          <div className="board-grid">
            {board.map((value, index) => (
              <button
                key={index}
                type="button"
                className={`square ${
                  winning?.line.includes(index) ? 'win' : ''
                } ${value ? 'filled' : ''}`}
                onClick={() => handleSquareClick(index)}
                aria-label={`square ${index + 1} ${value ? `filled with ${value}` : 'empty'}`}
              >
                <span>{value}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="score-row">
          <div className="score-card">
            <p>Momentum</p>
            <strong>{activeX}</strong>
            <small>Current X rhythm</small>
          </div>
          <div className="score-card">
            <p>Aura</p>
            <strong>{activeO}</strong>
            <small>O orbit energy</small>
          </div>
          <button className="reset-btn" onClick={resetBoard}>
            Reset board
          </button>
        </section>

        <footer className="footer-panel">
          <p>
            Swipe through the glow, keep the tempo, and use the glowing grid to
            rehearse your winning streak.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
