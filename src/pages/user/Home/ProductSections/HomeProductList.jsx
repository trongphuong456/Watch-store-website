import { generatePath, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getProductListUserAction } from "../../../../redux/actions";

import { Col, Row } from "antd";

import * as S from "./style";
import { ROUTES } from "../../../../constants/routes";

const HomeProductList = ({ gender }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productListUser } = useSelector((state) => state.product);

  const displayProducts = productListUser.data.filter(
    (product) => product.gender === gender
  );

  const shuffled = displayProducts?.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 4);

  useEffect(() => {
    dispatch(
      getProductListUserAction({
        params: {
          page: 1,
          limit: 999,
        },
      })
    );
  }, []);

  const renderMenProducts = () => {
    return selected.map((product) => {
      return (
        <Col span={12} key={product.id}>
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${product.slug}.${product.id}`,
            })}
          >
            <S.Product>
              <div className="product__img">
                <img src={product.images[0].url} alt="product" />
              </div>
              <h2>{product.name}</h2>
            </S.Product>
          </Link>
        </Col>
      );
    });
  };

  return (
    <S.HomeProductWrapper>
      <div className="products-wrapper">
        <Row gutter={[8, 16]}>{renderMenProducts()}</Row>
      </div>
    </S.HomeProductWrapper>
  );
};

export default HomeProductList;
