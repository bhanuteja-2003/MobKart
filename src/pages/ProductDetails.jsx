import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const product = products.find((item) => {
    return item.id === parseInt(id);
  });
  if (!product) {
    return (
      <section className="h-screen flex items-center justify-center">
        Loading...
      </section>
    );
  }

  const { name, price, RAM, Memory, OS, processor, image } = product;

  return (
    <section className="pt-40 pb-12 lg:py-32 min-h-screen flex items-center">
      <div className="container mx-auto h-full">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex-1 flex items-center justify-center mb-8 lg:mb-0">
            <img
              src={image}
              alt="product"
              className="max-w-[200px] lg:max-w-[300px]"
            />
          </div>
          <div className="flex-1 text-center lg:text-left text-black">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {name}
            </h1>
            <div className="text-xl text-accent font-medium mb-6">
              Rs {price}
            </div>
            <p className="mb-8 max-w-[450px] mx-auto lg:mx-0">RAM: {RAM}</p>
            <p className="mb-8 max-w-[450px] mx-auto lg:mx-0">
              Memory: {Memory}
            </p>
            <p className="mb-8 max-w-[450px] mx-auto lg:mx-0">OS: {OS}</p>
            <p className="mb-8 max-w-[450px] mx-auto lg:mx-0">
              Processor: {processor}
            </p>
            <button
              className="bg-primary py-4 px-8 text-white"
              onClick={() => {
                addToCart(product, product.id);
                toast.success("Added to cart");
              }}
            >
              Add to cart
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
