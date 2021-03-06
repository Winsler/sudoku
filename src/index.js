module.exports = function solveSudoku(matrix) {


  function canInsert(matrix, coords, number) {

  	function getRow(matrix, indexRow) {
  		return matrix[indexRow];
  	}


  	function getColumn(matrix, indexColumn) {
  		const col = matrix.map(row => row[indexColumn]);
  		return col;
  	}


  	function getSquare(matrix, coords) {
  		const startRow = Math.trunc(coords.row / 3) * 3,
            startCol = Math.trunc(coords.col / 3) * 3;
      let square = [];

      for (let i = startRow; i < startRow + 3; i++) {
       for (let j = startCol; j < startCol + 3; j++) {
        square.push(matrix[i][j]);
        }
      }

      return square;
    }


    const row = getRow(matrix, coords.row);
    if (row.indexOf(number) == -1) {
      const col = getColumn(matrix, coords.col);
      if (col.indexOf(number) == -1) {
        const square = getSquare(matrix, coords);
        if (square.indexOf(number) == -1) {
         return true;
       }
     }
    }

  	return false;
  }


  let  zeroesCoords = [];

  matrix.forEach(
  	(row, rowIndex) => row.forEach(
  		function(el, colIndex) {
  			if (!el) zeroesCoords.push({row: rowIndex, col: colIndex});
  		}
  	))


  function solveSudo(sudo, zeroes) {

  	if (!zeroes.length) {
  		return sudo;
  	}

  	

  	let isSolved,
        newSudo = JSON.parse(JSON.stringify(sudo));
    const zero = {
          row: zeroes[0].row,
          col: zeroes[0].col
        },
          newZeroes = zeroes.slice(1);

  	for (let i = 1; i <= 9; i++) {	
  		if (canInsert(sudo, zero, i)) {
				newSudo[zero.row][zero.col] = i;
	  		let isSolved = solveSudo(newSudo, newZeroes);
	  		if (isSolved) return isSolved;
  		}
  	}

  	return false;
  	
  }

  return solveSudo(matrix, zeroesCoords)
}

