export default function NewProductPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      <form className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input type="number" step="0.01" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bulk Price (optional)</label>
          <input type="number" step="0.01" className="w-full p-2 border rounded" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Product
        </button>
      </form>
    </div>
  );
}