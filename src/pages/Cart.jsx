import React, { useContext } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { BsCart3 } from "react-icons/bs";
import { IoMdRemove, IoMdAdd } from "react-icons/io";

import { CartContext } from "../contexts/CartContext";

const Cart = () => {
  const { cart, itemAmount, total } = useContext(CartContext);
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);

  return (
    <section className="pt-28 lg:pt-40 pb-12 lg:py-32 min-h-screen overflow-hidden select-none relative">
      {itemAmount ? (
        <div className="container mx-auto">
          <div className="flex items-center justify-between capitalize">
            <h3 className="text-xl lg:text-3xl font-medium">Your cart</h3>
            <Link to={"/#products"}>
              <span className="text-xs lg:text-base hover:text-accent transition duration-300">
                Continue shopping
              </span>
            </Link>
          </div>
          <table className="table-fixed min-w-full mt-4 lg:mt-8">
            <thead className="border-b-[0.5px] border-black/20">
              <tr>
                <th className="w-[40%] lg:w-[60%] text-left py-4 uppercase font-extralight text-[10px] lg:text-xs">
                  Product
                </th>
                <th className="w-[15%] lg:w-[10%] text-center py-4 uppercase font-extralight text-[10px] lg:text-xs">
                  Price
                </th>
                <th className="w-[30%] lg:w-[20%] text-center py-4 uppercase font-extralight text-[10px] lg:text-xs">
                  Quantity
                </th>
                <th className="w-[15%] lg:w-[10%] text-right py-4 uppercase font-extralight text-[10px] lg:text-xs">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const { id, name, image, price, amount } = item;

                return (
                  <tr key={id} className="border-b-[0.5px] border-black/20">
                    <td className="text-left py-4 lg:py-8 flex gap-x-2 lg:gap-x-12">
                      <Link to={`/product/${id}`}>
                        <img
                          src={image}
                          alt="product"
                          className="max-w-[40px] lg:max-w-[60px]"
                        />
                      </Link>
                      <div className="w-full flex flex-col gap-y-1 lg:gap-y-2">
                        <Link
                          to={`/product/${id}`}
                          className="w-fit text-[10px] lg:text-sm uppercase font-medium text-black hover:underline"
                        >
                          {name}
                        </Link>

                        <div
                          className="w-fit cursor-pointer"
                          onClick={() => removeFromCart(id)}
                        >
                          <button className="text-[8px] lg:text-[10px] uppercase py-1 px-4 text-black/50 hover:text-black bg-gray-100 hover:bg-red-300 transition duration-300">
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-[15%] lg:max-w-[10%] text-center py-4 lg:py-8">
                      <div className="flex-1 flex items-center justify-around text-accent text-xs lg:text-base">
                        Rs {price}
                      </div>
                    </td>
                    <td className="max-w-[30%] lg:max-w-[20%] py-4 lg:py-8">
                      <div className="flex max-w-[100px] lg:max-w-[150px] mx-auto items-center justify-center h-full border text-black font-medium py-2 lg:py-4">
                        <div
                          className="flex-1 h-full flex items-center justify-center cursor-pointer active:scale-125 hover:text-red-500"
                          onClick={() => decreaseAmount(id)}
                        >
                          <IoMdRemove />
                        </div>
                        <div className="h-full flex items-center justify-center px-1 lg:px-2">
                          {amount}
                        </div>
                        <div
                          className="flex-1 h-full flex items-center justify-center cursor-pointer active:scale-125 hover:text-green-500"
                          onClick={() => increaseAmount(id)}
                        >
                          <IoMdAdd />
                        </div>
                      </div>
                    </td>
                    <td className="max-w-[15%] lg:max-w-[10%] text-right py-4 lg:py-8">
                      <div className="flex-1 flex justify-end items-center font-semibold text-accent text-xs lg:text-base">{`Rs ${parseFloat(
                        price * amount
                      ).toFixed(2)}`}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex flex-col gap-y-8 lg:flex-row lg:justify-between pt-8 gap-x-10">
            <div className="flex-1 flex flex-col">
              <span className="text-xs">Order notes:</span>
              <textarea
                className="border focus:outline-none p-4"
                cols="20"
                rows="3"
                placeholder="Your message..."
              ></textarea>
            </div>
            <div className="flex-1 flex flex-col items-center lg:items-end gap-y-8">
              <div className="flex flex-col items-center lg:items-end">
                <div className="uppercase font-semibold text-accent text-xl">
                  <span className="mr-1 text-black text-base font-medium">
                    Subtotal:{" "}
                  </span>
                  Rs {parseFloat(total).toFixed(2)}
                </div>
                <p className="text-xs text-black/60">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
              <Link
                to={"/checkout"}
                className="bg-primary max-w-[350px] capitalize flex items-center justify-center p-2 text-white w-full font-medium"
              >
                Checkout
              </Link>
            </div>
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

export default Cart;
