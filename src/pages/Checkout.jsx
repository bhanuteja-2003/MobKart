import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import { BsCart3 } from "react-icons/bs";

import { CartContext } from "../contexts/CartContext";

const Checkout = () => {
  const { itemAmount, cart, total, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    clearCart();
    navigate("/");
  };

  return (
    <section className="pt-28 lg:pt-40 pb-12 lg:py-32 min-h-screen overflow-hidden flex items-center justify-center">
      {itemAmount ? (
        <div className="container mx-auto flex flex-col gap-y-20 lg:flex-row lg:gap-x-16">
          <div className="flex flex-col lg:w-2/5 order-1 lg:order-2">
            <div className="mb-6 border-b py-4">
              <h4 className="text-sm text-center lg:text-left lg:text-xl font-medium capitalize">
                Order Summary
              </h4>
            </div>

            <div className="flex flex-col gap-y-4">
              {cart.map((item) => {
                const { id, title, image, price, amount } = item;

                return (
                  <div key={id} className="flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                      <div className="relative">
                        <img
                          src={image}
                          alt="product"
                          className="max-w-[40px]"
                        />
                        <div className="bg-gray-400 absolute -right-2 -top-2 text-[12px] h-[20px] w-[20px] text-white rounded-full flex items-center justify-center">
                          {amount}
                        </div>
                      </div>
                      <p className="text-sm font-medium max-w-[200px] lg:max-w-[280px]">
                        {title}
                      </p>
                    </div>
                    <div className="flex-1 flex justify-end items-center font-semibold">{`Rs ${parseFloat(
                      price * amount
                    ).toFixed(2)}`}</div>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="flex py-4 mt-4">
                <h2 className="text-base font-bold">ITEMS: {itemAmount}</h2>
              </div>

              <div className="flex items-center justify-between w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5">
                <span>Subtotal</span>
                <span className="ml-2">Rs {parseFloat(total).toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5">
                <span>Shipping Tax</span>
                <span className="ml-2">Free</span>
              </div>

              <div className="flex items-center justify-between w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 last:border-b-0 last:pb-0">
                <span>Total</span>
                <span className="ml-2">Rs {parseFloat(total).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center lg:w-3/5 order-2 lg:order-1">
            <p className="text-xl text-center mb-6">
              Thank you for shopping with us!
            </p>
            <button
              className="bg-primary py-4 px-8 text-white"
              onClick={handlePlaceOrder}
            >
              Place order
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full absolute top-0 right-0 bottom-0 left-0 m-auto flex flex-col items-center justify-center gap-y-16 capitalize">
          <p className="text-xl">Your cart is empty</p>
          <Link to={"/#products"}>
            <button className="flex flex-col items-center justify-center gap-y-6 group">
              <div className="text-5xl p-16 shadow-lg rounded-full text-black/50 group-hover:text-black transition duration-300 group-hover:shadow-xl">
                <BsCart3 />
              </div>
              <span className="text-base group-hover:text-accent transition duration-300 capitalize">
                Continue shopping
              </span>
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Checkout;
