import { type QubitId } from './qubit.js'

const LABEL_HINT_UNLABELLED = '<no label>'

export abstract class QubitError extends Error {
  protected static getLabelHint(qubitId: QubitId): string {
    const label = qubitId.description
    const labelHint = label ? `"${label}"` : LABEL_HINT_UNLABELLED

    return labelHint
  }

  public abstract readonly qubitId: QubitId
}
