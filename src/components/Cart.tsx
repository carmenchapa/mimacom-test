import React, { useContext } from 'react'
import { store } from '../store.js'
import './Cart.css'

export interface Item {
  item: { productName: string; price: number }
  amount: number
}

export interface Props {
  products: Item[]
}

export interface CounterProps {
  item: Item
}

const Cart = ({ close }: { close: () => void }) => {
  const globalState = useContext(store)
  const { dispatch } = globalState

  const increment = (item: Item) => {
    dispatch({ type: 'add_to_cart', item: item.item })
  }

  const decrement = (item: Item) => {
    dispatch({ type: 'remove_from_cart', item: item.item })
  }

  const getTotalPrice = () => {
    let total: number[] = []
    globalState.state.cart.forEach((item: Item, i) =>
      total.push(item.item.price * item.amount)
    )
    return total.reduce((a, b) => a + b, 0)
  }

  const Counter = ({ item }: CounterProps) => (
    <div className="flex row centerItems">
      <div className="sign" onClick={() => decrement(item)}>
        <p>-</p>
      </div>
      <p>{item.amount}</p>
      <div className="sign" onClick={() => increment(item)}>
        <p>+</p>
      </div>
    </div>
  )

  return (
    <div className="cartContainer">
      <div className="cartContent flex column ">
        <div className="flex row space-between header">
          <p>cart</p>
          <p onClick={close}>x</p>
        </div>

        {globalState.state.cart.map((item: Item, i) => (
          <div key={`cartItem- ${i}`} className="flex row space-between">
            <div className="flex row flex2 centerItems">
              <p>{item.item.productName}</p>
            </div>
            <Counter item={item} />
          </div>
        ))}

        <div className="flex row space-between header">
          <p>TOTAL</p>
          <p>{getTotalPrice()}</p>
        </div>
      </div>
    </div>
  )
}

export default Cart
