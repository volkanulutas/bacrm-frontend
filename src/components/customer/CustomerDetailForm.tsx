import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Button, Form, Input, Divider, Spin, Space } from "antd";
import {
  getCustomerById,
  createCustomer,
} from "../../service/customer.service";
const { TextArea } = Input;

interface Customer {
  id: string;
  name: string;
  definition: string;
  address: string;
  telephone: number;
}

export const getMillisDate = (dateStr: string): number => {
  let date = new Date(dateStr);
  return date.getTime();
};

export const getFullDate = (dateNum: number): string => {
  let date = new Date(dateNum);
  return date.toDateString();
};

const CustomerDetailForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false); // TODO: role integratiob should be done.
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [item, setItem] = useState<Customer>();

  useEffect(() => {
    getData({ id }.id + "").then((res) => {});
  }, [id, form]);

  const getData = async (id: string) => {
    if (id === "-1") {
      return;
    }
    setLoading(true);
    await getCustomerById(id).then((res) => {
      setLoading(false);
      const data = res.data;
      setItem(data);
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        definition: data.definition,
        address: data.address,
        telephone: data.telephone,
      });
    });
  };

  const onFinish = (values: any) => {
    const data = {
      id: values.id,
      name: values.name,
      definition: values.definition,
      address: values.address,
      telephone: values.telephone,
    };

    createCustomer(data).then((res) => {
      setLoading(true);
      setTimeout(() => {
        form.resetFields();
        setLoading(false);
        navigate("/customer-list", { replace: true });
      }, 500);
    });
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Divider>Müşteri Detayı</Divider>
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
            label="Müşteri Adı"
            name={"name"}
            rules={[{ required: true, message: "Müşteri Adını girmelisiniz." }]}
          >
            <Input placeholder="İş Adı" />
          </Form.Item>
          <Form.Item
            label="Müşteri Açıklaması"
            name={"definition"}
            rules={[
              {
                required: false,
                message: "Müşteri Açıklamasını girmelisiniz.",
              },
            ]}
          >
            <Input placeholder="Müşteri Açıklaması" />
          </Form.Item>

          <Form.Item
            label="Müşteri Adresi"
            name={"address"}
            rules={[
              { required: true, message: "Müşteri Adresini girmelisiniz." },
            ]}
          >
            <Input placeholder="Müşteri Adresi" />
          </Form.Item>
          <Form.Item
            label="Müşteri Telefonu"
            name={"telephone"}
            rules={[
              { required: true, message: "Müşteri Telefonunu girmelisiniz." },
            ]}
          >
            <Input placeholder="Müşteri Telefonu" />
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
export default CustomerDetailForm;
