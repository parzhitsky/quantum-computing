import { type Multiplicands, kroneckerMultiply } from './math/matrix--kronecker-multiply.js'
import { type Matrix } from './math/matrix.js'

export function buildGate(...multiplicands: Multiplicands): Matrix {
  return kroneckerMultiply(multiplicands)
}
