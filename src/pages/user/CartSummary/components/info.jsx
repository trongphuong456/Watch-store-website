import * as S from "../style";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import { STEP } from "./constants/step";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  clearLocationAction,
  setCheckoutInfoAction,
} from "../../../../redux/actions";
import { useMemo } from "react";

const Info = ({ setStep }) => {
  const accessToken = localStorage.getItem("accessToken");

  const dispatch = useDispatch();
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  const { userInfo } = useSelector((state) => state.user);
  const { cartList, checkoutCoupon } = useSelector((state) => state.cart);
  const [infoForm] = Form.useForm();

  const initialFormValue = {
    nameInfo: userInfo.data.userName || "",
    emailInfo: userInfo.data.email || "",
    phoneNumber: undefined,
    cityCode: undefined,
    districtCode: undefined,
    wardCode: undefined,
    address: "",
  };

  const totalPrice = cartList.reduce((prev, item) => {
    return prev + item.totalPrice;
  }, 0);

  useEffect(() => {
    dispatch(getCityListAction());

    return () => {
      dispatch(clearLocationAction());
    };
  }, []);

  useEffect(() => {
    infoForm.resetFields();
  }, [userInfo.data]);

  const handleSubmitInfoForm = (values) => {
    const { cityCode, districtCode, wardCode, ...otherValues } = values;
    const cityData = cityList.data.find((item) => item.code === cityCode);
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    );
    const wardData = wardList.data.find((item) => item.code === wardCode);

    dispatch(
      setCheckoutInfoAction({
        ...otherValues,
        cityId: cityData.id,
        cityName: cityData.name,
        districtId: districtData.id,
        districtName: districtData.name,
        wardId: wardData.id,
        wardName: wardData.name,
      })
    );
    setStep(STEP.PAYMENT);
  };

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [districtList.data]);

  const renderWardListOptions = useMemo(() => {
    return wardList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [wardList.data]);

  const tableColumn = [
    {
      title: "T??n sa??n ph????m",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <Space>
            <Avatar shape="square" size={64} src={record.images} />
            <h4>{record.name}</h4>
          </Space>
        );
      },
    },
    {
      title: "Ha??ng",
      dataIndex: "category",
      key: "category",
      align: "center",
      render: (category) => category.name,
      responsive: ["md"],
    },
    {
      title: "S???? l??????ng",
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "center",
    },
    {
      title: "????n gia??",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: 120,
      render: (_, record) => (
        <p>
          {record.price.toLocaleString()}
          <sup>??</sup>
        </p>
      ),
      responsive: ["md"],
    },
    {
      title: "T????ng ti????n",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
      width: 120,
      render: (_, record) => (
        <p>
          {record.totalPrice.toLocaleString()}
          <sup>??</sup>
        </p>
      ),
    },
  ];

  const tableData = cartList.map((item) => ({ ...item, key: item.id }));

  return (
    <S.CheckoutCartContainer>
      <h2 className="cart_summary-heading">Th??ng tin giao ha??ng</h2>

      <S.CartInfoSummary>
        <Card size="small" title="Th??ng tin ????n ha??ng">
          <Table
            columns={tableColumn}
            dataSource={tableData}
            pagination={false}
            footer={() =>
              checkoutCoupon.discountPrice ? (
                <h4 style={{ textAlign: "right" }}>
                  Tha??nh ti????n: {checkoutCoupon.discountPrice?.toLocaleString()}
                  <sup>??</sup> (??a?? a??p du??ng ma?? gia??m gia?? {checkoutCoupon.discount}
                  %)
                </h4>
              ) : (
                <h4 style={{ textAlign: "right" }}>
                  Tha??nh ti????n: {totalPrice?.toLocaleString()}
                  <sup>??</sup>
                </h4>
              )
            }
          />
        </Card>
      </S.CartInfoSummary>

      <Card size="small" className="info-card" title="Th??ng tin ng??????i nh????n">
        <Form
          name="infoForm"
          form={infoForm}
          initialValues={initialFormValue}
          layout="vertical"
          onFinish={(values) => handleSubmitInfoForm(values)}
        >
          <Row gutter={[16, 16]}>
            <Col xxl={8} lg={8} md={12} sm={24} xs={24}>
              <Form.Item
                label="H??? t??n ng?????i nh????n"
                name="nameInfo"
                rules={[
                  {
                    required: true,
                    message: "Th??ng tin n??y kh??ng ???????c b??? tr???ng!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={8} lg={8} md={12} sm={24} xs={24}>
              <Form.Item
                label="Email"
                name="emailInfo"
                rules={[
                  {
                    required: true,
                    message: "Th??ng tin n??y kh??ng ???????c b??? tr???ng!",
                  },
                  {
                    type: "email",
                    message: "Email kh??ng ??u??ng ??i??nh da??ng",
                  },
                ]}
              >
                <Input disabled={!!accessToken} />
              </Form.Item>
            </Col>
            <Col xxl={8} lg={8} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Th??ng tin n??y kh??ng ???????c b??? tr???ng!",
                  },
                  {
                    pattern:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                    message: "S???? ??i????n thoa??i kh??ng ??u??ng ??i??nh da??ng",
                  },
                ]}
                label="S??? ??i???n tho???i"
                name="phoneNumber"
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xxl={8} lg={8} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Th??ng tin n??y kh??ng ???????c b??? tr???ng!",
                  },
                ]}
                label="T???nh/Th??nh ph????"
                name="cityCode"
              >
                <Select
                  placeholder="Cho??n Ti??nh/Tha??nh ph????"
                  onChange={(value) => {
                    dispatch(getDistrictListAction({ cityCode: value }));
                    infoForm.setFieldsValue({
                      districtCode: undefined,
                      wardCode: undefined,
                    });
                  }}
                >
                  {renderCityOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={8} lg={8} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Th??ng tin n??y kh??ng ???????c b??? tr???ng!",
                  },
                ]}
                label="Qu???n/Huy???n"
                name="districtCode"
              >
                <Select
                  placeholder="Cho??n Qu????n/Huy????n"
                  onChange={(value) => {
                    dispatch(getWardListAction({ districtCode: value }));
                    infoForm.setFieldsValue({
                      wardCode: undefined,
                    });
                  }}
                >
                  {renderDistrictOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={8} lg={8} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Th??ng tin n??y kh??ng ???????c b??? tr???ng!",
                  },
                ]}
                label="Ph?????ng/X??"
                name="wardCode"
              >
                <Select placeholder="Cho??n Ph??????ng/Xa??">
                  {renderWardListOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Th??ng tin n??y kh??ng ???????c b??? tr???ng!",
                  },
                ]}
                label="?????a ch??? cu?? th????"
                name="address"
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Row justify="space-around" style={{ marginTop: 24 }}>
        <Button
          size="large"
          type="primary"
          ghost
          onClick={() => setStep(STEP.CART)}
        >
          Quay l???i
        </Button>
        <Button
          size="large"
          type="primary"
          // onClick={() => setStep(STEP.PAYMENT)}
          onClick={() => infoForm.submit()}
        >
          Ti???p t???c
        </Button>
      </Row>
    </S.CheckoutCartContainer>
  );
};

export default Info;
