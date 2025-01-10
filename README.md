# Boxing Challenge

A React application that intelligently calculates the optimal box sizes needed for shipping products, implementing a sophisticated packing algorithm to minimize shipping costs and maximize space efficiency.

## 🚀 Features

- Smart packing algorithm that optimizes box usage
- Support for up to 10 products with customizable dimensions and weights
- Real-time validation and error handling
- User-friendly interface for product selection
- Visual feedback for packing results

## 🛠️ Installation

1. Clone the repository:

git clone https://github.com/yourusername/boxing-challenge.git

2. Navigate to the project directory:

cd my-boxing

3. Install dependencies:

npm install

4. Run the development server:

npm run dev

## 📖 Usage Guide

### Adding Products

1. Browse the predefined product list
2. Select a product you want to pack
3. Enter the desired quantity (remember: maximum 10 products total)
4. Click "Add" to include in your packing list
5. Repeat steps 1-4 for additional products
6. Click "Define Boxes" to see the optimal box arrangement

### Reading Results

The application will show:

- Recommended box(es) with dimensions
- How products are distributed
- Space utilization metrics
- Weight distribution details
- Any warnings or errors

## ⚠️ Limitations & Edge Cases

### Size Constraints

- Maximum of 10 products per calculation
- Products must fit within available box dimensions
- Individual product dimensions cannot exceed box dimensions

### Weight Limitations

- Box weight limits must be respected
- Minimum product weight: 0.1kg
- Maximum product weight: 20kg

### Known Edge Cases

- Unusually shaped products may result in suboptimal packing
- Products with dimensions close to box sizes may cause fitting issues
- Complex combinations might not always yield the absolute optimal solution
