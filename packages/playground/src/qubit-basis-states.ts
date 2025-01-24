import { Amp } from './basis-states.js'
import { Complex } from './math/complex.js'

export type QubitBasisStates = readonly [
  Amp /* |0⟩ */,
  Amp /* |1⟩ */,
]

/** `|0⟩ = 1|0⟩ + 0|1⟩` */
export const qubitBasisStates0: QubitBasisStates = [
  new Complex(1),
  new Complex(0),
]

/** `|1⟩ = 0|0⟩ + 1|1⟩` */
export const qubitBasisStates1: QubitBasisStates = [
  new Complex(0),
  new Complex(1),
]
