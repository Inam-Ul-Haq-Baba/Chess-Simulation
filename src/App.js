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

let rookPosition={
  row: 2,
  col: 2
}

let bishopPosition = {
  row: 5,
  col: 4
}


function App() {

  const [highlightedBox,setHighlightedBox] = useState([]);

  function handleBoxClick(rowIndex,colIndex){
    let clickedBox = `${rowIndex}${colIndex}`;

    if(rookPosition.row == rowIndex && rookPosition.col == colIndex)
    {
      calculateRookMoves();
    }else if(bishopPosition.row == rowIndex && bishopPosition.col == colIndex){
      calculateBishopMoves();
    }else{
      setHighlightedBox([])
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

  return (
    <div className="App">

      <div className="chessboard">
        {
          chessboard.map((row,rowIndex)=>(
            <div className="row">

              {
                row.map((box,colIndex)=>(
                  <div className={`${(rowIndex + colIndex) % 2 == 0 ? "whitebox" : "blackbox"} ${(highlightedBox.includes(`${rowIndex}${colIndex}`)) ? "highlighted" : ""}` }  onClick={()=>handleBoxClick(rowIndex,colIndex)}>

                    { (rowIndex == rookPosition.row && colIndex == rookPosition.col) ? <div className="rook" >R</div> : ""}
                    { (rowIndex == bishopPosition.row && colIndex == bishopPosition.col) ? <div className="bishop" >B</div> : ""}

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
