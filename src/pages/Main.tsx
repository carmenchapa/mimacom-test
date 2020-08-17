import React, { useContext, useEffect, useState } from 'react'
import { store } from '../store.js'
import './Main.css'
import Cart from '../components/Cart'
import ProductItem from '../components/ProductItem'

export interface Item {
  image_url: string
  productName: string
  productDescription: string
  price: number
  stock: number
}

export interface CartItem {
  item: Item
  amount: number
}

const URL = 'http://localhost:3000/grocery?_limit=40'

const Main = () => {
  const globalState = useContext(store)
  const { dispatch } = globalState

  const [cartVisible, setCartVisible] = useState(false)
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    dispatch({ type: 'set_items', items: data })
  }

  const onCartClick = () => {
    setCartVisible(!cartVisible)
  }

  const addToCart = (item: string) => {
    dispatch({ type: 'add_to_cart', item })
  }

  const getTotalItems = () => {
    let total: number[] = []
    globalState.state.cart.forEach((item: CartItem, i) =>
      total.push(item.amount)
    )
    return total.reduce((a, b) => a + b, 0)
  }

  return (
    <div>
      <div className="flex row space-between">
        <p>product list</p>
        <div onClick={onCartClick}>
          <p className="cartButton">CART ({getTotalItems()})</p>
        </div>
      </div>

      <div className="Main">
        {globalState.state.items.map((item: Item, i) => (
          <ProductItem key={i} item={item} onAdd={addToCart} />
        ))}
      </div>
      {cartVisible && <Cart close={onCartClick} />}
    </div>
  )
}

export default Main
