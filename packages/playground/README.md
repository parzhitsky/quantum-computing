$`\ket0 = \begin{bmatrix}1 \\ 0\end{bmatrix}`$

$`\ket1 = \begin{bmatrix}0 \\ 1\end{bmatrix}`$

# 2-qubit system

## T C($\psi$)

```math
M_2 =
  U_{0} \otimes |ψ⟩⟨ψ|_{1} +
  I_{0} \otimes |ψ_⊥⟩⟨ψ_⊥|_{1}
```

```ts
const ψ_ = getOrthogonalQubitBasisStates(ψ)

const mψ = outerMultiplyTwoVectors(ψ, ψ)
const mψ_ = outerMultiplyTwoVectors(ψ_, ψ_)

add(
  kroneckerMultiply(
    gate,
    mψ,
  ),
  kroneckerMultiply(
    identity,
    mψ_,
  ),
)
```

## C($\psi$) T

```math
M_2 =
  |ψ⟩⟨ψ|_{0} \otimes U_{1} +
  |ψ_⊥⟩⟨ψ_⊥|_{0} \otimes I_{1}
```

# 3-qubit system

## T C($\psi$) _

```math
M_3 =
  U_{0} \otimes |ψ⟩⟨ψ|_{1} \otimes I_{2} +
  I_{0} \otimes |ψ_⊥⟩⟨ψ_⊥|_{1} \otimes I_{2}
```

## T _ C($\psi$)

```math
M_3 =
  U_{0} \otimes I_{1} \otimes |ψ⟩⟨ψ|_{2} +
  I_{0} \otimes I_{1} \otimes |ψ_⊥⟩⟨ψ_⊥|_{2}
```

```ts
const ψ_ = getOrthogonalQubitBasisStates(ψ)

const mψ = outerMultiplyTwoVectors(ψ, ψ)
const mψ_ = outerMultiplyTwoVectors(ψ_, ψ_)

add(
  kroneckerProduct(
    gate,
    identity,
    mψ,
  ),
  kroneckerProduct(
    identity,
    identity,
    mψ_,
  ),
)
```

## C($\psi$) T _

```math
M_3 =
  |ψ⟩⟨ψ|_{0} \otimes U_{1} \otimes I_{2} +
  |ψ_⊥⟩⟨ψ_⊥|_{0} \otimes I_{1} \otimes I_{2}
```

## _ T C($\psi$)

```math
M_3 =
  I_{0} \otimes U_{1} \otimes |ψ⟩⟨ψ|_{2} +
  I_{0} \otimes I_{1} \otimes |ψ_⊥⟩⟨ψ_⊥|_{2}
```

## C($\psi$) _ T

```math
M_3 =
  |ψ⟩⟨ψ|_{0} \otimes I_{1} \otimes U_{2} +
  |ψ_⊥⟩⟨ψ_⊥|_{0} \otimes I_{1} \otimes I_{2}
```

## _ C($\psi$) T

```math
M_3 =
  I_{0} \otimes |ψ⟩⟨ψ|_{1} \otimes U_{2} +
  I_{0} \otimes |ψ_⊥⟩⟨ψ_⊥|_{1} \otimes I_{2}
```

## T C($\psi$) C($\phi$)

```math
M_3 =
  U_{0} \otimes |ψ⟩⟨ψ|_{1} \otimes |ϕ⟩⟨ϕ|_{2} +
  I_{0} \otimes |ψ⟩⟨ψ|_{1} \otimes |ϕ_⊥⟩⟨ϕ_⊥|_{2} +
  I_{0} \otimes |ψ_⊥⟩⟨ψ_⊥|_{1} \otimes |ϕ⟩⟨ϕ|_{2} +
  I_{0} \otimes |ψ_⊥⟩⟨ψ_⊥|_{1} \otimes |ϕ_⊥⟩⟨ϕ_⊥|_{2}
```

```ts
const ψ_ = getOrthogonalQubitBasisStates(ψ)
const ϕ_ = getOrthogonalQubitBasisStates(ϕ)

const mψ = outerMultiplyTwoVectors(ψ, ψ)
const mψ_ = outerMultiplyTwoVectors(ψ_, ψ_)
const mϕ = outerMultiplyTwoVectors(ϕ, ϕ)
const mϕ_ = outerMultiplyTwoVectors(ϕ_, ϕ_)

add(
  kroneckerProduct(
    gate,
    mψ,
    mϕ,
  ),
  kroneckerProduct(
    identity,
    mψ,
    mϕ_,
  ),
  kroneckerProduct(
    identity,
    mψ_,
    mϕ,
  ),
  kroneckerProduct(
    identity,
    mψ_,
    mϕ_,
  ),
)
```

## C($\psi$) T C($\phi$)

```math
M_3 =
  |ψ⟩⟨ψ|_{0} \otimes U_{1} \otimes |ϕ⟩⟨ϕ|_{2} +
  |ψ⟩⟨ψ|_{0} \otimes I_{1} \otimes |ϕ_⊥⟩⟨ϕ_⊥|_{2} +
  |ψ_⊥⟩⟨ψ_⊥|_{0} \otimes I_{1} \otimes |ϕ⟩⟨ϕ|_{2} +
  |ψ_⊥⟩⟨ψ_⊥|_{0} \otimes I_{1} \otimes |ϕ_⊥⟩⟨ϕ_⊥|_{2}
```

## C($\psi$) C($\phi$) T

```math
M_3 =
  |ψ⟩⟨ψ|_{0} \otimes |ϕ⟩⟨ϕ|_{1} \otimes U_{2} +
  |ψ⟩⟨ψ|_{0} \otimes |ϕ_⊥⟩⟨ϕ_⊥|_{1} \otimes I_{2} +
  |ψ_⊥⟩⟨ψ_⊥|_{0} \otimes |ϕ⟩⟨ϕ|_{1} \otimes I_{2} +
  |ψ_⊥⟩⟨ψ_⊥|_{0} \otimes |ϕ_⊥⟩⟨ϕ_⊥|_{1} \otimes I_{2}
```

## T T C($\psi$)

```math
M_3 =
  U_{0} \otimes U_{1} \otimes |ψ⟩⟨ψ|_{2} +
  I_{0} \otimes I_{1} \otimes |ψ_⊥⟩⟨ψ_⊥|_{2}
```

## T C($\psi$) T

```math
M_3 = 
  U_{0} \otimes |ψ⟩⟨ψ|_{1} \otimes U_{2} +
  I_{0} \otimes |ψ_⊥⟩⟨ψ_⊥|_{1} \otimes I_{2}
```

## C($\psi$) T T

```math
M_3 = 
  |ψ⟩⟨ψ|_{0} \otimes U_{1} \otimes U_{2} +
  |ψ_⊥⟩⟨ψ_⊥|_{0} \otimes I_{1} \otimes I_{2}
```
