import { type MaybeComplex, type Complex } from './complex.js'
import { isVector, type VectorOf } from './vector.js'

export type MatrixOf<Item> = VectorOf<VectorOf<Item>>

export type Matrix = MatrixOf<Complex>

export type MatrixInput = MatrixOf<MaybeComplex>

export function isMatrix(value: unknown): value is Matrix {
  return Array.isArray(value) && value.every(isVector)
}
