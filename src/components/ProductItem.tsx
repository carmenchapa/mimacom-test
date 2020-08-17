import React from 'react'
import './ProductItem.css'

export interface Props {
  item: {
    image_url: string
    productName: string
    productDescription: string
    price: number
    stock: number
  }
  onAdd: any
}

const ProductItem = ({ item, onAdd }: Props) => {
  return (
    <div className="ProductItem">
      <img src={item.image_url} className="ProductImage" alt="logo" />
      <div className="flex column info">
        <div className="">
          <div className="flex row space-between">
            <p className="name">{item.productName}</p>
            <p>{item.price}€</p>
          </div>
          <div className="descriptionContainer">
            <p className="description">{item.productDescription}</p>
          </div>
        </div>

        <div className="flex row space-between bottomDiv">
          <p>{item.stock} left</p>
          <div className="button" onClick={() => onAdd(item)}>
            <p>+ ADD</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
