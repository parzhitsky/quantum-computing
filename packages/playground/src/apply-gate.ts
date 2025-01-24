import { type MatrixInput } from './math/matrix.js'
import { type QubitBasisStates, qubitBasisStates1 } from './qubit-basis-states.js'
import { QubitError } from './qubit-error.abstract.js'
import { type Qubit, type QubitId } from './qubit.js'
import { type Qubits } from './qubits.js'

type QubitRef = Qubit | QubitId
type QubitRefs = readonly QubitRef[]

function convertQubitRefToQubitId(ref: QubitRef): QubitId {
  return ref instanceof Object ? ref.id : ref
}

type Controls = Map<QubitId, QubitBasisStates>

interface ControlsRaw {
  readonly [qubitId: QubitId]: QubitBasisStates
}

type ControlsInput =
  | QubitRef // one control qubit in |1⟩ state
  | QubitRefs // 0+ control qubits in |1⟩ state
  | Controls | ControlsRaw // 0+ control qubits in arbitrary states

type ControlsEntry = readonly [QubitId, QubitBasisStates]

function convertRefToControlsEntry(ref: QubitRef): ControlsEntry {
  const id = convertQubitRefToQubitId(ref)

  return [id, qubitBasisStates1]
}

function createControls(input: ControlsInput | undefined): Controls {
  if (input instanceof Map) {
    return input
  }

  if (!input) {
    return createControls([])
  }

  if (typeof input === 'symbol' || 'id' in input) {
    return createControls([input])
  }

  const entries: ControlsEntry[] = []

  if (input instanceof Array) {
    entries.push(...input.map(convertRefToControlsEntry))
  } else {
    for (const qubitId of Object.getOwnPropertySymbols(input)) {
      entries.push([qubitId, input[qubitId]])
    }
  }

  const controls = new Map(entries)

  return controls
}

type Targets = readonly QubitId[]

type TargetsInput =
  | QubitRef // one target qubit
  | QubitRefs // 1+ target qubits

function createTargets(input: TargetsInput): Targets {
  if (!(input instanceof Array)) {
    return createTargets([input])
  }

  if (!input.length) {
    throw new QubitTargetsEmptyError()
  }

  const targets = input.map(convertQubitRefToQubitId)

  return targets
}

function createEmptyMatrixOfMatrices(
  productsCount: number,
  summationsCount: number,
): MatrixInput[][] {
  const innerArrayFromParams = { length: productsCount } as const
  const matrixOfMatrices = Array.from({ length: summationsCount }, () => (
    Array.from(innerArrayFromParams, () => [
      [1, 0],
      [0, 1],
    ])
  ))

  return matrixOfMatrices
}

function validateInputs(qubits: Qubits, targets: Targets, controls: Controls): void {
  const qubitIdsUnique = new Set<QubitId>()
  const qubitIds = [...targets, ...controls.keys()]

  for (const qubitId of qubitIds) {
    if (qubitIdsUnique.has(qubitId)) {
      throw new QubitDuplicateError(qubitId)
    }

    if (qubitId in qubits.indexById === false) {
      throw new QubitNotFound(qubitId, qubits)
    }

    qubitIdsUnique.add(qubitId)
  }
}

interface ApplyGateParams {
  readonly to: TargetsInput
  readonly in: Qubits
  readonly if?: ControlsInput
}

export function applyGate(gate: MatrixInput, {
  to: targetsInput,
  in: qubits,
  if: controlsInput,
}: ApplyGateParams): Qubits {
  const targets = createTargets(targetsInput)
  const controls = createControls(controlsInput)

  validateInputs(qubits, targets, controls)

  const qubitsCount = qubits.ids.length
  const controlsCount = controls.size
  const matrixOfMatrices = createEmptyMatrixOfMatrices(qubitsCount, 2 ** controlsCount)

  // TODO: implement the logic
}

export class QubitDuplicateError extends QubitError {
  constructor(readonly qubitId: QubitId) {
    const labelHint = new.target.getLabelHint(qubitId)

    super(`Qubit ${labelHint} is duplicated; each qubit can be specified exactly once as either a target or a control qubit`)
  }
}

export class QubitNotFound extends QubitError {
  constructor(
    readonly qubitId: QubitId,
    readonly qubits: Qubits,
  ) {
    const labelHint = new.target.getLabelHint(qubitId)

    super(`Qubit ${labelHint} is not found among the qubits`)
  }
}

export class QubitTargetsEmptyError extends Error {
  constructor() {
    super('At least one target qubit is required')
  }
}
