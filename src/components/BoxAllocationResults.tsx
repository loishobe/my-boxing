import { Box, Product, PackedBox } from "../types";

interface BoxAllocationResultsProps {
  packedBoxes: PackedBox[];
  unpackableProducts: Product[];
  errors: string[];
}

export const BoxAllocationResults = ({
  packedBoxes,
  unpackableProducts,
  errors,
}: BoxAllocationResultsProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Box Allocation Results</h2>

      {errors.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <h3 className="font-bold mb-2">Errors:</h3>
          <ul className="list-disc pl-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {packedBoxes.map((packedBox, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-bold">{packedBox.box.name}</h3>
            <p>Volume Utilization: {packedBox.volumeUtilization.toFixed(2)}%</p>
            <p>
              Weight: {packedBox.totalWeight}kg / {packedBox.box.weightLimit}kg
            </p>
            <div className="mt-2">
              <h4 className="font-semibold">Products:</h4>
              <ul className="list-disc pl-4">
                {packedBox.products.map((product, pIndex) => (
                  <li key={pIndex}>{product.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
