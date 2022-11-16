import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import slug from "slug";

import {
  Button,
  Select,
  Form,
  Input,
  InputNumber,
  Upload,
  Checkbox,
} from "antd";

import { ROUTES } from "../../../../constants/routes";
import {
  createBlogAction,
  getCategoriesListAction,
} from "../../../../redux/actions";

import * as S from "./styles";

const { Option } = Select;

const CreateBlogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createBlog } = useSelector((state) => state.blog);

  const [createForm] = Form.useForm();

  useEffect(() => {}, []);

  const handleCreateProduct = (data) => {
    console.log(data);
  };

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h3>Tạo bài viết mới</h3>

        <Button
          type="primary"
          htmlType="submit"
          loading={createBlog.loading}
          onClick={() => createForm.submit()}
        >
          Tạo bài viết mới
        </Button>
      </S.TopWrapper>

      <Form
        form={createForm}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        style={{ padding: "12px 0" }}
        autoComplete="off"
        onFinish={(values) => {
          handleCreateProduct(values);
        }}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Hãy nhập tiêu đề bài viết" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tác giả"
          name="author"
          rules={[{ required: true, message: "Hãy nhập tác giả bài viết" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nội dung bài viết"
          name="content"
          rules={[{ required: true, message: "Hãy nhập nội dung bài viết" }]}
        >
          <ReactQuill
            theme="snow"
            onChange={(value) => createForm.setFieldsValue({ content: value })}
          />
        </Form.Item>
      </Form>
    </S.Wrapper>
  );
};

export default CreateBlogPage;
