import { Complex } from './complex.js'
import { MatrixColCountUnexpectedError } from './matrix-col-count-unexpected-error.js'
import { MatrixInput } from './matrix.js'
import { VectorInput, Vector } from './vector.js'

export function dotMultiply(matrix: MatrixInput, vector: VectorInput): Vector {
  const colCountExpected = matrix[0].length

  if (vector.length !== colCountExpected) {
    throw new Error(`Expected a vector of length ${colCountExpected}, instead got length ${vector.length}`)
  }

  return matrix.map((row, rowIndex) => {
    const colCount = row.length

    if (colCount !== colCountExpected) {
      throw new MatrixColCountUnexpectedError(matrix, rowIndex, colCountExpected)
    }

    let sum = new Complex(0)

    for (let rowIndex = 0; rowIndex < colCount; rowIndex += 1) {
      const matrixValue = Complex.from(row[rowIndex])
      const vectorValue = Complex.from(vector[rowIndex])

      sum = sum.add(vectorValue.multiplyBy(matrixValue))
    }

    return sum
  })
}
