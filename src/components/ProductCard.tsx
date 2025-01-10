import { Field } from "formik";

interface ProductCardProps {
  product: {
    name: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    quantity: number;
  };
  index: number;
  onRemove: () => void;
}

export const ProductCard = ({ product, index, onRemove }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {product.name}
      </h3>
      <div className="space-y-3">
        <p className="text-gray-600">
          Dimensions: {product.length}x{product.width}x{product.height} cm
        </p>
        <p className="text-gray-600">Weight: {product.weight} kg</p>
        <div className="flex items-center space-x-3">
          <label htmlFor={`quantity-${index}`} className="text-gray-600">
            Quantity:
          </label>
          <Field
            id={`quantity-${index}`}
            type="number"
            name={`selectedProducts.${index}.quantity`}
            min="1"
            className="w-20 p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
