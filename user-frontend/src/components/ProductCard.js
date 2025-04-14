const ProductCard = ({ product }) => {
  const getStockStatus = () => {
    if (product.stock === 0) {
      return <span className="text-red-600 font-semibold">Out of Stock</span>;
    }
    if (product.stock < 10) {
      return <span className="text-red-600 font-semibold">In Stock: {product.stock}</span>;
    }
    return <span className="text-green-600 font-semibold">In Stock: {product.stock}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-36 sm:h-48 md:h-64">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <div className="mt-2">
          {getStockStatus()}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button
            className={`px-4 py-2 rounded-md ${
              product.stock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-semibold`}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 