import { applyGate } from './apply-gate.js'
import { buildGate } from './build-gate.js'
import { combineQubits } from './combine-qubits.js'
import { createQubit } from './create-qubit.js'

function log(value: unknown): void {
  console.dir(value, { depth: null })
}

const g1H = buildGate(Math.SQRT1_2, [
  [1, 1],
  [1, -1],
])

const q0 = createQubit({ label: 'q0' })
const q1 = createQubit({ label: 'q1' })
const q2 = createQubit({ label: 'q2' })
const sq012 = combineQubits(q0, q1, q2)

const mom = applyGate(g1H, {
  to: q0,
  in: sq012,
  if: [q1, q2],
})

log(mom)
