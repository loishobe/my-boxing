import boxes from './boxes.json'
import { Box, Product, PackedBox } from '../types'

export function findOptimalBoxes(products: Product[]): {
  packedBoxes: PackedBox[]
  unpackableProducts: Product[]
  errors: string[]
} {
  const packedBoxes: PackedBox[] = []
  const unpackableProducts: Product[] = []
  const errors: string[] = []

  // Expand products based on quantity
  const expandedProducts = products.flatMap(product => 
    Array(product.quantity).fill({ ...product, quantity: 1 })
  )

  // Sort products by volume (largest first) to optimize packing
  const sortedProducts = expandedProducts.sort((a, b) => 
    (b.length * b.width * b.height) - (a.length * a.width * a.height)
  )

  // Sort boxes by volume (smallest first) to minimize waste
  const sortedBoxes = [...boxes].map(box => ({
    ...box,
    weightLimit: box.weight_limit
  })).sort((a, b) => 
    (a.length * a.width * a.height) - (b.length * b.width * b.height)
  )

  for (const product of sortedProducts) {
    let packed = false
    const productVolume = product.length * product.width * product.height

    // Try to fit product in existing boxes first
    for (const packedBox of packedBoxes) {
      if (canFitInBox(product, packedBox.box, packedBox.totalWeight)) {
        packedBox.products.push(product)
        packedBox.totalWeight += product.weight
        packedBox.remainingWeight = packedBox.box.weightLimit - packedBox.totalWeight
        packedBox.volumeUtilization = calculateVolumeUtilization(packedBox.products, packedBox.box)
        packed = true
        break
      }
    }

    if (!packed) {
      // Try to find a new box
      let suitableBox = findSuitableBox(product, sortedBoxes)

      if (suitableBox) {
        const newPackedBox: PackedBox = {
          box: suitableBox,
          products: [product],
          totalWeight: product.weight,
          remainingWeight: suitableBox.weightLimit - product.weight,
          volumeUtilization: calculateVolumeUtilization([product], suitableBox)
        }
        packedBoxes.push(newPackedBox)
        packed = true
      } else {
        // Product doesn't fit in any available box
        unpackableProducts.push(product)
        errors.push(`Product "${product.name}" is too large for any available box`)
      }
    }
  }

  // Sort packed boxes by volume utilization
  packedBoxes.sort((a, b) => b.volumeUtilization - a.volumeUtilization)

  return { packedBoxes, unpackableProducts, errors }
}

function canFitInBox(product: Product, box: Box, currentWeight: number): boolean {
  // Check dimensions (product can be rotated)
  const dimensionsFit = (
    product.length <= box.length &&
    product.width <= box.width &&
    product.height <= box.height
  ) || (
    product.length <= box.length &&
    product.width <= box.height &&
    product.height <= box.width
  ) || (
    product.length <= box.width &&
    product.width <= box.length &&
    product.height <= box.height
  )

  // Check weight limit
  const weightFits = currentWeight + product.weight <= box.weightLimit

  return dimensionsFit && weightFits
}

function findSuitableBox(product: Product, boxes: Box[]): Box | null {
  return boxes.find(box => canFitInBox(product, box, 0)) || null
}

function calculateVolumeUtilization(products: Product[], box: Box): number {
  const boxVolume = box.length * box.width * box.height
  const productsVolume = products.reduce((sum, product) => 
    sum + (product.length * product.width * product.height), 0
  )
  return (productsVolume / boxVolume) * 100
} 