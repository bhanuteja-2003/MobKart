import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartContext } from "../contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { id, image, category, name, price, RAM, Memory } = product;

  return (
    <div>
      <div className="border border-gray-300 h-[300px] relative overflow-hidden transition group">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[200px] mx-auto flex items-center justify-center">
            <img
              src={image}
              alt="product"
              className="max-h-[160px] hover:scale-110 transition duration-300"
            />
          </div>
        </div>

        <div className="absolute top-0 -right-12 group-hover:right-0 flex flex-col items-center justify-center gap-y-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => {
              addToCart(product, id);
              toast.success("Added to cart");
            }}
          >
            <div className="flex items-center justify-center text-white w-12 h-12 bg-primary">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <ToastContainer />
          <Link
            to={`/product/${id}`}
            className="h-12 w-12 bg-white flex items-center justify-center text-black drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div className="text-black">
        <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{name}</h2>
        </Link>
        <div className="font-semibold text-accent">Rs {price}</div>
        <div className="text-xs text-gray-500">
          {RAM} | {Memory}
        </div>
      </div>
    </div>
  );
};

export default Product;
