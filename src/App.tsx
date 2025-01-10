import { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Box, Product, PackedBox } from "./types";
import "./App.css";
import products from "./utils/products.json";
import { ProductCard } from "./components/ProductCard";
import { BoxResults } from "./components/BoxResults";
import { findOptimalBoxes } from "./utils/boxFitting.ts";

interface FormValues {
  selectedProducts: Product[];
}

const validationSchema = Yup.object().shape({
  selectedProducts: Yup.array()
    .of(
      Yup.object().shape({
        quantity: Yup.number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
      })
    )
    .max(10, "You can select up to 10 products"),
});

function App() {
  const initialValues: FormValues = {
    selectedProducts: [],
  };

  const [boxResults, setBoxResults] = useState<{
    packedBoxes: PackedBox[];
    unpackableProducts: Product[];
    errors: string[];
  } | null>(null);

  const handleSubmit = (values: FormValues) => {
    const results = findOptimalBoxes(values.selectedProducts);
    setBoxResults(results);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Product Selection
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="selectedProducts">
              {({ push, remove }) => (
                <div>
                  {values.selectedProducts.length < 10 && (
                    <div className="mb-6">
                      <select
                        onChange={(e) => {
                          const productId = parseInt(e.target.value);
                          const product = products.find(
                            (p) => p.id === productId
                          );
                          if (product) {
                            push({ ...product, quantity: 1 });
                          }
                          e.target.value = ""; // Reset select after adding
                        }}
                        value=""
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="" disabled>
                          Select a product
                        </option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {values.selectedProducts.map((product, index) => (
                      <ProductCard
                        key={index}
                        product={product}
                        index={index}
                        onRemove={() => remove(index)}
                      />
                    ))}
                  </div>

                  {values.selectedProducts.length === 0 && (
                    <p className="text-gray-500 text-center">
                      No products selected. You can select up to 10 products.
                    </p>
                  )}

                  {values.selectedProducts.length > 0 && (
                    <div className="text-center">
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg text-lg font-semibold transition duration-200"
                      >
                        Define Boxes
                      </button>
                    </div>
                  )}
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>

      {boxResults && (
        <BoxResults
          packedBoxes={boxResults.packedBoxes}
          unpackableProducts={boxResults.unpackableProducts}
          errors={boxResults.errors}
        />
      )}
    </div>
  );
}

export default App;
