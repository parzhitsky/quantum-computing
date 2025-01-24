import { Complex } from './complex.js'
import { Matrix, MatrixInput } from './matrix.js'

export function createMatrix(input: MatrixInput): Matrix {
  return input.map((row) => row.map((value) => Complex.from(value)))
}

export function createEmptyMatrix(rowCount: number, colCount: number): Complex[][] {
  return Array.from({ length: rowCount }, () => (
    Array.from({ length: colCount }, () => new Complex(0))
  ))
}
