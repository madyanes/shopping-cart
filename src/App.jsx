import { useEffect, useState } from 'react'
import './App.css'

function getAllProducts() {
  return fetch('https://fakestoreapi.com/products?limit=10').then((res) =>
    res.json()
  )
}

function App() {
  const [shoppingCart, setShoppingCart] = useState([])

  function addProductToCart(product) {
    setShoppingCart((productsInCart) => [...productsInCart, product])
  }

  return (
    <>
      <ShoppingCart shoppingCart={shoppingCart} />
      <ProductList onAddToCart={addProductToCart} />
    </>
  )
}

function ProductList({ onAddToCart }) {
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    getAllProducts().then((products) => setAllProducts(products))
  }, [])

  return (
    <ul>
      {allProducts.map((product) => (
        <Product product={product} key={product.id} onAddToCart={onAddToCart} />
      ))}
    </ul>
  )
}

function Product({ product, onAddToCart }) {
  return (
    <li>
      <div className='product-image'>
        <img src={product.image} alt='' />
      </div>
      <div className='product-text'>
        <div>
          <div className='product-title'>{product.title}</div>
          <div className='product-price'>{product.price}</div>
        </div>
        <div>
          <button onClick={() => onAddToCart(product)}>Add to cart</button>
        </div>
      </div>
    </li>
  )
}

function ShoppingCart({ shoppingCart }) {
  const totalPrice = shoppingCart.reduce(
    (total, product) => total + product.price,
    0
  )

  return (
    <form>
      <div>
        <label htmlFor=''>Total Items</label>
        <input type='text' value={shoppingCart.length} disabled />
      </div>

      <div>
        <label htmlFor=''>Total price</label>
        <input type='text' value={totalPrice.toFixed(2)} disabled />
      </div>
    </form>
  )
}

export default App
