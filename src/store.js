import React, { createContext, useReducer } from 'react'

const initialState = {
  items: [],
  cart: [],
  state: { items: [], cart: [] },
  dispatch: (action) => {},
}
const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'set_items':
        const newState = {
          ...state,
          items: action.items,
        }
        return newState

      case 'add_to_cart':
        const inCart = state.cart.find((e) => e.item.id === action.item.id)
        let newCart = []
        if (inCart) {
          newCart = state.cart.map((i) =>
            i.item.id === action.item.id ? { ...i, amount: i.amount + 1 } : i
          )
        } else {
          newCart = [...state.cart, { item: action.item, amount: 1 }]
        }
        return { ...state, cart: newCart }

      case 'remove_from_cart':
        let updatedCart
        updatedCart = state.cart.map((i) =>
          i.item.id === action.item.id ? { ...i, amount: i.amount - 1 } : i
        )
        updatedCart = updatedCart.filter((e) => e.amount !== 0)
        return { ...state, cart: updatedCart }
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
