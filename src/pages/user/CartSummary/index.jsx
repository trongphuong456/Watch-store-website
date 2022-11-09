import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

import { Steps } from "antd";
import emptyCartImg from "../../../assets/cart/empty_cart_retina.png";

import Cart from "./components/cart";
import Info from "./components/info";
import Success from "./components/success";
import Payment from "./components/payment";
import * as S from "./style";

const CartSummaryPage = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [step, setStep] = useState(0);

  const renderCheckOutItem = useMemo(() => {
    switch (step) {
      case 1:
        return <Info setStep={setStep} />;
      case 2:
        return <Payment setStep={setStep} />;
      case 3:
        return <Success setStep={setStep} />;

      case 0:
      default:
        return <Cart setStep={setStep} />;
    }
  }, [step]);

  if (cartList.length === 0) {
    return (
      <S.Wrapper>
        <S.CheckoutCartContainer>
          <div className="cart-empty">
            <h2 className="cart_summary-heading">giỏ hàng</h2>

            <h3>Giỏ hàng của bạn chưa có sản phẩm nào.</h3>

            <div>
              <img src={emptyCartImg} alt="" />
            </div>
          </div>
        </S.CheckoutCartContainer>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.StepContainer>
        <Steps current={step}>
          <Steps.Step
            title="Giỏ hàng"
            icon={<i className="fa-solid fa-cart-shopping"></i>}
          ></Steps.Step>
          <Steps.Step
            title="Thông tin"
            icon={<i className="fa-regular fa-user"></i>}
          ></Steps.Step>
          <Steps.Step
            title="Thanh toán"
            icon={<i className="fa-solid fa-dollar-sign"></i>}
          ></Steps.Step>
          <Steps.Step
            title="Hoàn thành"
            icon={<i className="fa-regular fa-circle-check"></i>}
          ></Steps.Step>
        </Steps>
      </S.StepContainer>

      {renderCheckOutItem}
    </S.Wrapper>
  );
};

export default CartSummaryPage;
