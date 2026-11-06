import React, { useState } from "react";
import './App.css';

let chessboard = [];

for(let i=0; i<8; i++)
{
  let row = [];
  for(let j=0; j<8; j++)
  {
    row.push(`${i}${j}`)
  }
  chessboard.push(row);
}

function App() {

  const [highlightedBox,setHighlightedBox] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const [rookPosition, setRookPosition]=useState({
    row: 2,
    col: 2
  });

  const [bishopPosition,setBishopPosition] = useState({
    row: 4,
    col: 6
  })

  const [queenPosition ,setQueenPosition]= useState({
    row: 2,
    col: 5
  })

  const [knightPosition,setKnightPosition] = useState({
    row: 5,
    col: 3
  })



  function handleBoxClick(rowIndex,colIndex){
    let clickedBox = `${rowIndex}${colIndex}`;

    if(highlightedBox.includes(clickedBox))
    {
      if(selectedPiece === "rook")
      {
        setRookPosition({
          row: rowIndex,
          col: colIndex
        });
      }else if(selectedPiece === "bishop")
      {
        setBishopPosition({
          row: rowIndex,
          col: colIndex
        })
      }else if(selectedPiece === "queen")
      {
        setQueenPosition({
          row: rowIndex,
          col: colIndex
        })
      }else if(selectedPiece === "knight"){
        setKnightPosition({
          row: rowIndex,
          col: colIndex
        })
      }else{
        setSelectedPiece(null);
      }
    }

    if(rookPosition.row === rowIndex && rookPosition.col === colIndex)
    {
      setSelectedPiece("rook");
      calculateRookMoves();
    }else if(bishopPosition.row === rowIndex && bishopPosition.col === colIndex){
      setSelectedPiece("bishop");
      calculateBishopMoves();
    }else if(queenPosition.row === rowIndex && queenPosition.col === colIndex){
      setSelectedPiece("queen");
      calculateQueenMoves();
    }else if(knightPosition.row === rowIndex && knightPosition.col === colIndex){
      setSelectedPiece("knight");
      calculateKnightMoves();
    }else{
      setHighlightedBox([])
      setSelectedPiece(null)
    }

  }

// Function for Calculating Bishop Moves
function calculateBishopMoves(){

    let moves = []
    const direction = [
      [1,1],
      [-1,1],
      [-1,-1],
      [1,-1]
    ];

    direction.forEach(([rowChange,colChange])=>{

      let newRow = bishopPosition.row + rowChange;
      let newCol = bishopPosition.col + colChange;

      while( newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8)
      {
        moves.push(`${newRow}${newCol}`);
        newRow += rowChange;
        newCol += colChange;
      }

    });

    setHighlightedBox(moves);
  };

// Function for Calculating Rook Moves
  function calculateRookMoves(){

    let moves = []
    const direction = [
      [1,0],
      [0,1],
      [-1,0],
      [0,-1]
    ];

    direction.forEach(([rowChange,colChange])=>{

      let newRow = rookPosition.row + rowChange;
      let newCol = rookPosition.col + colChange;

      while( newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8)
      {
        moves.push(`${newRow}${newCol}`);
        newRow += rowChange;
        newCol += colChange;
      }

    });

    setHighlightedBox(moves);
  };

// Function for Calculating Queen Moves
  function calculateQueenMoves(){

    let moves = []
    const direction = [
      [1,0],
      [0,1],
      [-1,0],
      [0,-1],
      [1,1],
      [-1,1],
      [-1,-1],
      [1,-1]
    ];

    direction.forEach(([rowChange,colChange])=>{

      let newRow = queenPosition.row + rowChange;
      let newCol = queenPosition.col + colChange;

      while( newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8)
      {
        moves.push(`${newRow}${newCol}`);
        newRow += rowChange;
        newCol += colChange;
      }

    });

    setHighlightedBox(moves);
  };

// Function for Calculating knight Moves
  function calculateKnightMoves(){

    let moves = []
    const direction = [
      [2,-1],
      [2,1],
      [1,2],
      [-1,2],
      [-2,1],
      [-2,-1],
      [-1,-2],
      [1,-2]
    ];

    direction.forEach(([rowChange,colChange])=>{

      let newRow = knightPosition.row + rowChange;
      let newCol = knightPosition.col + colChange;

      if( newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8)
      {
        moves.push(`${newRow}${newCol}`);
        newRow += rowChange;
        newCol += colChange;
      }

    });

    setHighlightedBox(moves);
  };

  return (
    <div className="App">
      <h3>Selected Piece: {selectedPiece}</h3>
      <div className="chessboard">
        {
          chessboard.map((row,rowIndex)=>(
            <div className="row">

              {
                row.map((box,colIndex)=>(
                  <div className={`${(rowIndex + colIndex) % 2 === 0 ? "whitebox" : "blackbox"} ${(highlightedBox.includes(`${rowIndex}${colIndex}`)) ? "highlighted" : ""}` }  onClick={()=>handleBoxClick(rowIndex,colIndex)}>

                    { (rowIndex === rookPosition.row && colIndex === rookPosition.col) ? <div className="rook" >R</div> : ""}
                    { (rowIndex === bishopPosition.row && colIndex === bishopPosition.col) ? <div className="bishop" >B</div> : ""}
                    { (rowIndex === queenPosition.row && colIndex === queenPosition.col) ? <div className="queen" >Q</div> : ""}
                    { (rowIndex === knightPosition.row && colIndex === knightPosition.col) ? <div className="knight" >K</div> : ""}

                  </div>
                ))
              }

            </div>
          ))
        }
      </div>
     
    </div>
  );
}

export default App;
