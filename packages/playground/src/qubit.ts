import { type QubitBasisStates } from './qubit-basis-states.js'

export type QubitId = symbol

export interface Qubit {
  readonly id: QubitId
  readonly basisStates: QubitBasisStates
}
