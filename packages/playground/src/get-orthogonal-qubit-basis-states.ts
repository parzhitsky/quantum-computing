import { createQubitBasisStates } from './create-qubit-basis-states.js'
import { Complex } from './math/complex.js'
import { type QubitBasisStates } from './qubit-basis-states.js'

export function getOrthogonalQubitBasisStates(given: QubitBasisStates): QubitBasisStates {
  // TODO: apply the logic from createQubitBasisStates directly in-place
  return createQubitBasisStates(
    new Complex(-given[1].magnitude, -given[1].angle),
    new Complex(given[0].magnitude, -given[0].angle),
  )
}
