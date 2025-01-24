import { QubitBasisStates, qubitBasisStates0 } from './qubit-basis-states.js'
import { Qubit } from './qubit.js'

interface CreateQubitParams {
  readonly label?: string
  readonly value?: QubitBasisStates
}

export function createQubit({
  label = '',
  value: basisStates = qubitBasisStates0,
}: CreateQubitParams = {}): Qubit {
  const id = Symbol(label)

  return {
    id,
    basisStates,
  }
}
