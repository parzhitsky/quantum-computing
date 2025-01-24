import { assertIsSquare } from './math/matrix--assert-is-square.js'
import { type MatrixInput } from './math/matrix.js'

export function getGateArity(gate: MatrixInput): number {
  return Math.log2(assertIsSquare(gate).length)
}
