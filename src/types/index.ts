export interface Box {
  id: number
  name: string
  length: number
  width: number
  height: number
  weightLimit: number
}

export interface Product {
  id: number
  name: string
  length: number
  width: number
  height: number
  weight: number
  quantity: number
}

export interface PackedBox {
  box: Box
  products: Product[]
  totalWeight: number
  remainingWeight: number
  volumeUtilization: number
}   