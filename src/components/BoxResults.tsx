import { useState } from "react";
import { Box, Product, PackedBox } from "../types";

interface BoxResultsProps {
  packedBoxes: PackedBox[];
  unpackableProducts: Product[];
  errors: string[];
}

export const BoxResults = ({
  packedBoxes,
  unpackableProducts,
  errors,
}: BoxResultsProps) => {
  return (
    <div className="mt-8">
      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-700 font-semibold mb-2">Unable to Pack:</h3>
          <ul className="list-disc pl-4 space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-red-600">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Packed Boxes */}
      <div className="space-y-6">
        {packedBoxes.map((packedBox, boxIndex) => (
          <div
            key={boxIndex}
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            {/* Box Header */}
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Box {boxIndex + 1}: {packedBox.box.name}
              </h3>
            </div>

            {/* Box Details */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Dimensions</p>
                  <p className="font-medium">
                    {packedBox.box.length} × {packedBox.box.width} ×{" "}
                    {packedBox.box.height} cm
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weight Usage</p>
                  <p className="font-medium">
                    {packedBox.totalWeight.toFixed(1)} /{" "}
                    {packedBox.box.weightLimit} kg
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Volume Utilization</p>
                  <p className="font-medium">
                    {packedBox.volumeUtilization.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Products List */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Packed Products:
                </h4>
                <ul className="divide-y divide-gray-200">
                  {packedBox.products.map((product, productIndex) => (
                    <li key={productIndex} className="py-2">
                      <div className="flex justify-between">
                        <span className="text-gray-800">{product.name}</span>
                        <span className="text-gray-600">
                          {product.length}×{product.width}×{product.height} cm,{" "}
                          {product.weight} kg
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
