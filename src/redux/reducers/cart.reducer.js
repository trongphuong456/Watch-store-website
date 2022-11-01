import { createReducer } from "@reduxjs/toolkit";
import { CART_ACTION, REQUEST } from "../CONSTANTS";
const initialValue = {
  cartList: JSON.parse(localStorage.getItem("cart")) || [],
};

const cartReducer = createReducer(initialValue, {
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, actions) => {
    const { product, productAmount } = actions.payload;

    let index =
      state.cartList.findIndex((item) => item.id === product.data?.id) || 0;

    if (index === -1) {
      const newItem = {
        ...product.data,
        totalAmount: productAmount,
        totalPrice: product.data.finalPrice,
      };
      const newCartList = [newItem, ...state.cartList];

      localStorage.setItem("cart", JSON.stringify(newCartList));

      return {
        ...state,
        cartList: newCartList,
      };
    } else {
      const totalAmount = state.cartList[index].totalAmount + productAmount;
      const existProduct = {
        ...product.data,
        totalAmount: parseInt(totalAmount),
        totalPrice: parseFloat(totalAmount * product.data.finalPrice),
      };
      const newCartList = [...state.cartList];
      newCartList.splice(index, 1, existProduct);

      localStorage.setItem("cart", JSON.stringify(newCartList));

      return {
        ...state,
        cartList: newCartList,
      };
    }
  },
  [REQUEST(CART_ACTION.UPDATE_CART_ITEM)]: (state, actions) => {
    const { product, amount } = actions.payload;
    const newCartList = [...state.cartList];

    let index = state.cartList.findIndex((item) => item.id === product.id);

    if (amount === 0) {
      newCartList.splice(index, 1);
    } else {
      const newItem = {
        ...product,
        totalAmount: amount,
        totalPrice: product.finalPrice * amount,
      };
      newCartList.splice(index, 1, newItem);
    }

    localStorage.setItem("cart", JSON.stringify(newCartList));

    return {
      ...state,
      cartList: newCartList,
    };
  },
  [REQUEST(CART_ACTION.REMOVE_CART_ITEM)]: (state, action) => {
    const { productId } = action.payload;
    const newCartList = [...state.cartList].filter(
      (item) => item.id !== productId
    );
    localStorage.setItem("cart", JSON.stringify(newCartList));

    return {
      ...state,
      cartList: newCartList,
    };
  },
});

export default cartReducer;
