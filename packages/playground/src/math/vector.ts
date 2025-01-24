import { type MaybeComplex, Complex } from './complex.js'

export type VectorOf<Item> = readonly Item[]

export type Vector = VectorOf<Complex>

export type VectorInput = VectorOf<MaybeComplex>

export function isVector(value: unknown): value is Vector {
  return Array.isArray(value) && value.every(Complex.isComplex)
}
