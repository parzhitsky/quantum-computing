import { type MatrixInput } from './matrix.js'

export class MatrixColCountUnexpectedError extends Error {
  constructor(
    readonly matrix: MatrixInput,
    readonly rowIndex: number,
    readonly rowLengthExpected: number,
  ) {
    super('Encountered a row in a matrix with an unexpected number of columns')
  }
}
