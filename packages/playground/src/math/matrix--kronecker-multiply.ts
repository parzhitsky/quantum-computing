import { Complex, isMaybeComplex, MaybeComplex } from './complex.js'
import { assertIsSquare } from './matrix--assert-is-square.js'
import { createEmptyMatrix, createMatrix } from './matrix--create-matrix.js'
import { MatrixColCountUnexpectedError } from './matrix-col-count-unexpected-error.js'
import { MatrixInput, Matrix, MatrixOf } from './matrix.js'

export function kroneckerMultiplyTwo(left: MatrixInput, right: MatrixInput): Matrix {
  const rowCountLeft = left.length
  const colCountLeft = left[0].length
  const rowCountRight = right.length
  const colCountRight = right[0].length
  const rowCountResult = rowCountLeft * rowCountRight
  const colCountResult = colCountLeft * colCountRight
  const matrix = createEmptyMatrix(rowCountResult, colCountResult)

  for (let rowIndexLeft = 0; rowIndexLeft < rowCountLeft; rowIndexLeft += 1) {
    const rowLeft = left[rowIndexLeft]

    if (rowLeft.length !== colCountLeft) {
      throw new MatrixColCountUnexpectedError(left, rowIndexLeft, colCountLeft)
    }

    for (let colIndexLeft = 0; colIndexLeft < colCountLeft; colIndexLeft += 1) {
      for (let rowIndexRight = 0; rowIndexRight < rowCountRight; rowIndexRight += 1) {
        const rowRight = right[rowIndexRight]

        if (rowRight.length !== colCountRight) {
          throw new MatrixColCountUnexpectedError(right, rowIndexRight, colCountRight)
        }

        for (let colIndexRight = 0; colIndexRight < colCountRight; colIndexRight += 1) {
          const valueLeft = Complex.from(rowLeft[colIndexLeft])
          const valueRight = Complex.from(rowRight[colIndexRight])
          const rowIndexResult = rowCountRight * rowIndexLeft + rowIndexRight
          const colIndexResult = colCountRight * colIndexLeft + colIndexRight

          matrix[rowIndexResult][colIndexResult] = valueLeft.multiplyBy(valueRight)
        }
      }
    }
  }

  return matrix
}

export type Multiplicand = MatrixInput | MaybeComplex

export type Multiplicands = readonly [first: Multiplicand, ...rest: Multiplicand[]]

function scalarToMatrix<Scalar extends MaybeComplex>(scalar: Scalar): MatrixOf<Scalar> {
  return [[scalar]]
}

function convertMultiplicandToMatrix(multiplicand: Multiplicand): Matrix {
  if (isMaybeComplex(multiplicand)) {
    multiplicand = scalarToMatrix(multiplicand)
  }

  const matrixInput = assertIsSquare(multiplicand)
  const matrix = createMatrix(matrixInput)

  return matrix
}

export const identity = scalarToMatrix(new Complex(1))

export function kroneckerMultiply(multiplicands: Multiplicands): Matrix {
  const matrix = multiplicands
    .map(convertMultiplicandToMatrix)
    .reduce(kroneckerMultiplyTwo, identity)

  return matrix
}
