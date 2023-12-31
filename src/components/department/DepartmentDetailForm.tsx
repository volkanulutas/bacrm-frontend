import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Button, Form, Input, Divider, Spin, Space } from "antd";
import {
  getDepartmentById,
  createDepartment,
} from "../../service/department.service";
const { TextArea } = Input;

interface Department {
  id: string;
  name: string;
  description: string;
}

const DepartmentDetailForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false); // TODO: role integratiob should be done.
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [item, setItem] = useState<Department>();

  useEffect(() => {
    getData({ id }.id + "").then((res) => {});
  }, [id, form]);

  const getData = async (id: string) => {
    if (id === "-1") {
      return;
    }
    setLoading(true);
    await getDepartmentById(id).then((res) => {
      setLoading(false);
      const data = res.data;
      setItem(data);
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        description: data.description,
      });
    });
  };

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      form.resetFields();
      createDepartment(values)
        .then((response) => {
          navigate("/department-list", { replace: true });
        })
        .catch((error) => {});
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Divider>Departman Detayı</Divider>
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          disabled={componentDisabled}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="No" name={"id"}>
            <Input placeholder="No" disabled={true} />
          </Form.Item>
          <Form.Item
            label="Departman Adı"
            name={"name"}
            rules={[{ required: true, message: "Bölüm Adını girmelisiniz." }]}
          >
            <Input placeholder="Departman Adı" />
          </Form.Item>
          <Form.Item
            label="Departman Açıklaması"
            name={"description"}
            rules={[
              {
                required: true,
                message: "Departman Açıklamasını girmelisiniz.",
              },
            ]}
          >
            <Input placeholder="Departman Açıklaması" />
          </Form.Item>

          <Space direction="horizontal" size={12}>
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginBottom: 16, marginLeft: 30 }}
            >
              Kaydet
            </Button>
            <Button
              htmlType="reset"
              type="primary"
              style={{ marginBottom: 16 }}
            >
              İptal
            </Button>
          </Space>
        </Form>
      </Spin>
    </div>
  );
};
export default DepartmentDetailForm;
