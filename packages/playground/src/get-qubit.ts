import { type BasisStates } from './basis-states.js'
import { Complex } from './math/complex.js'
import { type QubitBasisStates } from './qubit-basis-states.js'
import { type QubitId, type Qubit } from './qubit.js'
import { type Qubits } from './qubits.js'
import { sumSquaredMagnitudes } from './sum-squared-magnitudes.js'

function normalizeBasisStates(basisStates: BasisStates): BasisStates {
  const magnitude = sumSquaredMagnitudes(basisStates)
  const factor = new Complex(magnitude ** (-1 / 2))
  const normalized = basisStates.map((amp) => amp.multiplyBy(factor))

  return normalized
}

export function getQubit(qubits: Qubits, id: QubitId): Qubit {
  const qubitsCount = qubits.ids.length
  const qubitIndex = qubits.indexById[id] ?? -1
  const basisStates = [
    new Complex(0),
    new Complex(0),
  ] satisfies QubitBasisStates

  /** Bitmask that selects indexes where the target qubit is in the `|1⟩` state. */
  const v1IndexFilter = 2 ** (qubitsCount - 1 - qubitIndex)

  for (let index = 0; index < qubits.#basisStates.length; index += 1) {
    const value = index & v1IndexFilter ? 1 : 0

    basisStates[value] = basisStates[value].add(qubits.#basisStates[index])
  }

  const qubitBasisStates = normalizeBasisStates(basisStates) as QubitBasisStates

  return {
    id,
    basisStates: qubitBasisStates,
  }
}

export function* getQubits(qubits: Qubits): IterableIterator<Qubit> {
  for (const id of qubits.ids) {
    yield getQubit(qubits, id)
  }
}
