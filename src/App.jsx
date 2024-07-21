import { useEffect, useState } from 'react'
import './App.css'

function getAllProducts() {
  return fetch('https://fakestoreapi.com/products?limit=10').then((res) =>
    res.json()
  )
}

function App() {
  return (
    <>
      <ShoppingCart />
      <ProductList />
    </>
  )
}

function ProductList() {
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    getAllProducts().then((products) => setAllProducts(products))
  }, [])

  return (
    <ul>
      {allProducts.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </ul>
  )
}

function Product({ product }) {
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
          <button>Add to cart</button>
        </div>
      </div>
    </li>
  )
}

function ShoppingCart() {
  return (
    <form>
      <div>
        <label htmlFor=''>Total Items</label>
        <input type='text' value='0' disabled />
      </div>

      <div>
        <label htmlFor=''>Total price</label>
        <input type='text' value='0' disabled />
      </div>
    </form>
  )
}

export default App
