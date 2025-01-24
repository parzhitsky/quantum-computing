import { kroneckerMultiplyTwo, identity } from './math/matrix--kronecker-multiply.js'
import { QubitError } from './qubit-error.abstract.js'
import { Qubit, type QubitId } from './qubit.js'

const [basisStatesInitial] = identity

export type QubitIndexById = Record<QubitId, number>

export class Qubits {
  readonly ids: QubitId[] = []
  readonly indexById = Object.create(null) as QubitIndexById
  basisStates = basisStatesInitial

  addQubit(newQubit: Qubit): void {
    if (newQubit.id in this.indexById) {
      throw new QubitAlreadyAddedError(newQubit.id)
    }

    const index = this.ids.length

    this.ids.push(newQubit.id)
    this.indexById[newQubit.id] = index;

    // treat vectors as matrices with one row and N columns
    [this.basisStates] = kroneckerMultiplyTwo([this.basisStates], [newQubit.basisStates])
  }
}

export class QubitAlreadyAddedError extends QubitError {
  constructor(readonly qubitId: QubitId) {
    const labelHint = new.target.getLabelHint(qubitId)

    super(`Cannot add qubit ${labelHint}: this qubit is already added`)
  }
}
