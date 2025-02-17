import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const products = [
  { id: 1, name: "Кашемировое пальто", category: "Пальто", price: 15000, image: "/images/coat.jpg" },
  { id: 2, name: "Кожаная куртка", category: "Куртки", price: 12000, image: "/images/jacket.jpg" },
  { id: 3, name: "Пуховик на зиму", category: "Пуховики", price: 18000, image: "/images/downjacket.jpg" },
  { id: 4, name: "Джинсовая куртка", category: "Куртки", price: 8000, image: "/images/jeanjacket.jpg" }
];

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <div className="p-4 bg-pink-100 min-h-screen relative">
      <h1 className="text-4xl font-bold text-fuchsia-600 text-center mb-6">За стилем</h1>

      {/* Иконка корзины */}
      <div className="absolute top-4 right-4 flex items-center">
        <button onClick={() => setCartOpen(!cartOpen)} className="relative">
          <ShoppingCart className="w-8 h-8 text-gray-700" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Корзина */}
      {cartOpen && (
        <div className="absolute top-12 right-4 bg-white p-4 rounded shadow-md w-72">
          <h3 className="text-xl font-bold">🛒 Корзина</h3>
          {cart.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            <ul>
              {cart.map(item => (
                <li key={item.id} className="flex justify-between border-b py-2">
                  {item.name} - {item.price} ₽
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500">Удалить</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Фильтр по категориям */}
      <div className="flex gap-4 my-4 justify-center">
        <button onClick={() => setSelectedCategory("")} className="px-4 py-2 bg-gray-200 rounded">Все</button>
        <button onClick={() => setSelectedCategory("Пальто")} className="px-4 py-2 bg-gray-200 rounded">Пальто</button>
        <button onClick={() => setSelectedCategory("Куртки")} className="px-4 py-2 bg-gray-200 rounded">Куртки</button>
        <button onClick={() => setSelectedCategory("Пуховики")} className="px-4 py-2 bg-gray-200 rounded">Пуховики</button>
      </div>

      {/* Сортировка */}
      <div className="flex justify-center mb-4">
        <label className="mr-2">Сортировка:</label>
        <select onChange={(e) => setSortOrder(e.target.value)} className="px-2 py-1 border rounded">
          <option value="asc">По возрастанию цены</option>
          <option value="desc">По убыванию цены</option>
        </select>
      </div>

      {/* Отображение товаров */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.price} ₽</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Добавить в корзину
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}