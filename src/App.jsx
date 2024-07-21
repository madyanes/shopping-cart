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
    setShoppingCart((productsInCart) => [...productsInCart, product])
  }

  return (
    <>
      <main>
        <ShoppingCart shoppingCart={shoppingCart} />
        <div className='group-product-list'>
          <ProductList onAddToCart={addProductToCart} />
          <aside id='shopping-cart-detail'>
            <ShoppingCartDetail shoppingCart={shoppingCart} />
          </aside>
        </div>
      </main>
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

function ShoppingCartDetail({ shoppingCart }) {
  const groupedProducts = shoppingCart.reduce((acc, product) => {
    const found = acc.find((item) => item.id === product.id)
    if (found) {
      found.quantity += 1
    } else {
      acc.push({ ...product, quantity: 1 })
    }
    return acc
  }, [])
  return (
    <>
      <h1>Shopping cart</h1>
      <ul>
        {groupedProducts.map((product, index) => (
          <ShoppingCartItem product={product} key={index} />
        ))}
      </ul>
    </>
  )
}

function ShoppingCartItem({ product }) {
  return (
    <>
      <li className='shopping-cart-item'>
        <div>{product.title}</div>
        <div>(Qty: {product.quantity})</div>
      </li>
    </>
  )
}

export default App
