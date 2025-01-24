import { MatrixColCountUnexpectedError } from './matrix-col-count-unexpected-error.js'
import { MatrixRowCountUnexpectedError } from './matrix-row-count-unexpected-error.js'
import { MatrixInput } from './matrix.js'

export function assertIsSquare(input: MatrixInput): MatrixInput {
  const colCount = input[0].length

  if (input.length !== colCount) {
    throw new MatrixRowCountUnexpectedError(input, colCount)
  }

  for (const [rowIndex, row] of input.entries()) {
    if (row.length !== colCount) {
      throw new MatrixColCountUnexpectedError(input, rowIndex, colCount)
    }
  }

  return input
}
