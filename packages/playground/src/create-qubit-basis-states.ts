import { assertUnitMagnitude } from './assert-unit-magnitude.js'
import { Amp } from './basis-states.js'
import { Complex, MaybeComplex } from './math/complex.js'
import { QubitBasisStates } from './qubit-basis-states.js'

function normalizeRelativePhase(ket0: Amp, ket1: Amp): QubitBasisStates {
  return [
    new Complex(ket0.magnitude, 0),
    new Complex(ket1.magnitude, ket1.angle - ket0.angle),
  ]
}

export function createQubitBasisStates(ket0: MaybeComplex, ket1: MaybeComplex): QubitBasisStates {
  const normalized = normalizeRelativePhase(
    Complex.from(ket0),
    Complex.from(ket1),
  )

  assertUnitMagnitude(normalized)

  return normalized
}
