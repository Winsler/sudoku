module.exports = function solveSudoku(matrix) {


  function canInsert(matrix, coords, number) {

  	function getRow(matrix, indexRow) {
  		return matrix[indexRow];
  	}


  	function getColumn(matrix, indexColumn) {
  		var col = matrix.map(row => row[indexColumn])
  		return col;
  	}


  	function getSquare(matrix, coords) {
  		var startRow = Math.trunc(coords.row / 3) * 3,
  				startCol = Math.trunc(coords.col / 3) * 3,
  				square = [];

  				for (let i = startRow; i < startRow + 3; i++) {
  					for (let j = startCol; j < startCol + 3; j++) {
  						square.push(matrix[i][j]);
  					}
  				}

  				return square;
  	}

  	let row = getRow(matrix, coords.row);
  	if (row.indexOf(number) == -1) {
  		let col = getColumn(matrix, coords.col);
  			if (col.indexOf(number) == -1) {
  				let square = getSquare(matrix, coords);
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
  			i = 1;

  	while (i <= 9) {	
 
  		if (canInsert(sudo, zeroes[0], i)) {
  			let newSudo = JSON.parse(JSON.stringify(sudo)),
  					newZeroes = zeroes.slice();

				newSudo[zeroes[0].row][zeroes[0].col] = i;
  			newZeroes.shift();

	  		let isSolved = solveSudo(newSudo, newZeroes);
	  		if (isSolved) return isSolved;
  		}

  		i++;

  	}

  	return false;
  	
  }

  return solveSudo(matrix, zeroesCoords)

}

