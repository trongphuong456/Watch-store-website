import * as S from "../style";
import { Link, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { ROUTES } from "../../../../constants/routes";

const Info = ({ setStep }) => {
  const navigate = useNavigate();

  return (
    <S.CheckoutCartContainer>
      <h2 className="cart_summary-heading">Thanh toán thành công</h2>

      <Result
        status="success"
        title="Đặt hàng thành công"
        subTitle="Cảm ơn bạn đã đặt hàng, chúng tôi sẽ liên hệ và giao hàng trong thời gian sớm nhất."
        extra={[
          <Button type="primary" key="console">
            <Link to={ROUTES.USER.USER_INFO_ORDER}>Xem đơn hàng</Link>
          </Button>,
          <Button key="buy">
            <Link to={ROUTES.USER.BRAND}>Về trang sản phẩm</Link>
          </Button>,
        ]}
      />
    </S.CheckoutCartContainer>
  );
};

export default Info;
