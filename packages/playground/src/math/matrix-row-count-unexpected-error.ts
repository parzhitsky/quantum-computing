import { type MatrixInput } from './matrix.js'

export class MatrixRowCountUnexpectedError extends Error {
  constructor(
    readonly matrix: MatrixInput,
    readonly rowCountExpected: number,
  ) {
    super(`Expected number of rows in a matrix to be ${rowCountExpected}, instead got ${matrix.length}`)
  }
}
