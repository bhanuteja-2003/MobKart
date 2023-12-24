import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";

import { CartContext } from "../contexts/CartContext";

const CartItem = ({ item }) => {
  const { id, name, image, price, amount } = item;
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);

  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light">
      <div className="w-full min-h-[150px] flex items-center gap-x-4 select-none">
        <Link to={`/product/${id}`}>
          <img src={image} alt="product" className="max-w-[80px]" />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[210px] text-black hover:underline"
            >
              {name}
            </Link>
            <div
              className="text-xl cursor-pointer"
              onClick={() => removeFromCart(id)}
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-black font-medium">
              <div
                className="flex-1 h-full flex items-center justify-center cursor-pointer active:scale-125 hover:text-red-500"
                onClick={() => decreaseAmount(id)}
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex items-center justify-center px-2">
                {amount}
              </div>
              <div
                className="flex-1 h-full flex items-center justify-center cursor-pointer active:scale-125 hover:text-green-500"
                onClick={() => increaseAmount(id)}
              >
                <IoMdAdd />
              </div>
            </div>
            <div className="flex-1 flex items-center justify-around text-accent">
              Rs {price}
            </div>
            <div className="flex-1 flex justify-end items-center font-semibold text-accent">{`$ ${parseFloat(
              price * amount
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
