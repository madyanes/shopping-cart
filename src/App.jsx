/* eslint-disable react/prop-types */

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
    setShoppingCart((productsInCart) => {
      // Find existing product in cart
      const existingProduct = productsInCart.find((p) => p.id === product.id)

      if (existingProduct) {
        // Update quantity of product which is already in the cart
        return productsInCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      } else {
        // Add quantity property to product which is not in the cart yet
        return [...productsInCart, { ...product, quantity: 1 }]
      }
    })
  }

  function updateCart(productId, qty) {
    setShoppingCart((productsInCart) => {
      if (qty < 1) {
        return productsInCart.filter((product) => product.id !== productId)
      } else {
        return productsInCart.map((product) =>
          product.id === productId ? { ...product, quantity: qty } : product
        )
      }
    })
  }

  return (
    <>
      <main>
        <ShoppingCart shoppingCart={shoppingCart} />
        <div className='group-product-list'>
          <ProductList onAddToCart={addProductToCart} />
          <aside id='shopping-cart-detail'>
            <ShoppingCartDetail
              shoppingCart={shoppingCart}
              onUpdateCart={updateCart}
            />
          </aside>
        </div>
      </main>
    </>
  )
}

function ProductList({ onAddToCart }) {
  const [allProducts, setAllProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAllProducts()
      .then((products) => {
        setAllProducts(products)
        setIsLoading(false)
      })
      .catch((error) => {
        setError('Failed to fetch products:', error)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      {isLoading && (
        <ul>
          <li>Loading</li>
        </ul>
      )}

      {error && (
        <ul>
          <li>{error}</li>
        </ul>
      )}

      {!isLoading && (
        <ul>
          {allProducts.map((product) => (
            <Product
              product={product}
              key={product.id}
              onAddToCart={onAddToCart}
            />
          ))}
        </ul>
      )}
    </>
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
    (total, product) => total + product.price * product.quantity,
    0
  )

  const totalItems = shoppingCart.reduce(
    (total, product) => total + product.quantity,
    0
  )

  return (
    <form>
      <div>
        <label htmlFor=''>Total Items</label>
        <input type='text' value={totalItems} disabled />
      </div>

      <div>
        <label htmlFor=''>Total price</label>
        <input type='text' value={totalPrice.toFixed(2)} disabled />
      </div>
    </form>
  )
}

function ShoppingCartDetail({ shoppingCart, onUpdateCart }) {
  return (
    <>
      <ShoppingCart shoppingCart={shoppingCart} />
      <div>
        <h1>Shopping cart</h1>
        <ul>
          {shoppingCart.map((product, index) => (
            <ShoppingCartItem
              product={product}
              key={index}
              onUpdateCart={onUpdateCart}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

function ShoppingCartItem({ product, onUpdateCart }) {
  function handleChange(e) {
    const qty = parseInt(e.target.value, 10)
    onUpdateCart(product.id, qty)
  }

  return (
    <>
      <li className='shopping-cart-item'>
        <div>{product.title}</div>
        <div>
          <input
            type='number'
            value={product.quantity}
            onChange={handleChange}
          />
        </div>
      </li>
    </>
  )
}

export default App
