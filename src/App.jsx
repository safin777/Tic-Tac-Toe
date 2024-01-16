import { useState } from 'react'

const Square = ({ value, onSquareClick }) => {
  return (
    <>
      <button
        onClick={onSquareClick}
        className="w-12 h-12 leading-9 bg-white border border-gray-600 border-spacing-4"
      >
        {value}
      </button>
    </>
  )
}

function Board({ squares, onPlay, xIsNext}) {
  
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  const winner = calculateWinner(squares)

  let status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return
    const nextSetSquares = squares.slice()
    nextSetSquares[i] = xIsNext ? 'X' : 'O'
    onPlay(nextSetSquares)
  }

  return (
    <>
      <div className="text-2xl font-bold">{status}</div>
      <div className="flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [xIsNext, setXIsNext] = useState(true)
  const currentSquares = history[history.length - 1]

  const handlePlay = (nextSquares) => {
    setHistory([...history, nextSquares])
    setXIsNext(!xIsNext)
  }

  const moves = history.map((step, move) => {
   let description ;
   if(move>0){
      description = `Go to move #${move}`
   }else{
      description = `Go to game start`
   }
   return (
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
   )
    
  })

  const jumpTo = (step) => {
    setHistory(history.slice(0,step+1))
    setXIsNext(step%2===0)
  }
    
  return (
    <>
      <div className="flex flex-row gap-6">
        <div className="flex flex-col items-center justify-center ">
          <div className="text-4xl font-bold">Tic Tac Toe</div>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">Game History</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  )
}
