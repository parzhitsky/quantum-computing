import { Complex } from './complex.js'
import { createEmptyMatrix } from './matrix--create-matrix.js'
import { Matrix } from './matrix.js'
import { VectorInput } from './vector.js'

export function outerMultiplyTwoVectors(left: VectorInput, right: VectorInput): Matrix {
  const rowCount = left.length
  const colCount = right.length
  const matrix = createEmptyMatrix(rowCount, colCount)

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex += 1) {
    for (let colIndex = 0; colIndex < colCount; colIndex += 1) {
      const valueLeft = Complex.from(left[rowIndex])
      const valueRight = Complex.from(right[colIndex])

      matrix[rowIndex][colIndex] = valueLeft.multiplyBy(valueRight)
    }
  }

  return matrix
}
