import { getQubits } from './get-qubit.js'
import { type Qubit } from './qubit.js'
import { Qubits } from './qubits.js'

type CombinedItem = Qubit | Qubits
type CombinedItems = readonly [first: CombinedItem, ...rest: CombinedItem[]]

export function combineQubits(...items: CombinedItems): Qubits {
  const qubits = new Qubits()

  for (const item of items) {
    if ('id' in item) {
      qubits.addQubit(item)
    } else {
      for (const qubit of getQubits(item)) {
        qubits.addQubit(qubit)
      }
    }
  }

  if (!qubits.basisStates) {
    throw new BasisStatesEmptyError()
  }

  return qubits
}

export class BasisStatesEmptyError extends Error {
  constructor() {
    super('Cannot combine qubits: combination must contain at least one qubit')
  }
}
