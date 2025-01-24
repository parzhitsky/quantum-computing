import { Complex } from './complex.js'
import { createEmptyMatrix } from './matrix--create-matrix.js'
import { MatrixColCountUnexpectedError } from './matrix-col-count-unexpected-error.js'
import { MatrixRowCountUnexpectedError } from './matrix-row-count-unexpected-error.js'
import { type Matrix, type MatrixInput } from './matrix.js'

export function add(left: MatrixInput, right: MatrixInput): Matrix {
  const rowCount = left.length

  if (right.length !== rowCount) {
    throw new MatrixRowCountUnexpectedError(right, rowCount)
  }

  const colCount = left[0].length
  const result = createEmptyMatrix(rowCount, colCount)

  for (const [rowIndex, rowLeft] of left.entries()) {
    if (rowLeft.length !== colCount) {
      throw new MatrixColCountUnexpectedError(left, rowIndex, colCount)
    }

    const rowRight = right[rowIndex]

    if (rowRight.length !== colCount) {
      throw new MatrixColCountUnexpectedError(right, rowIndex, colCount)
    }

    for (const colIndex of rowLeft.keys()) {
      const itemLeft = Complex.from(rowLeft[colIndex])
      const itemRight = Complex.from(rowRight[colIndex])

      result[rowIndex][colIndex] = itemLeft.add(itemRight)
    }
  }

  return result
}
