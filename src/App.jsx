import './App.css'

function App() {
  return <ShoppingCart />
}

function ProductList() {}

function Product() {}

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
