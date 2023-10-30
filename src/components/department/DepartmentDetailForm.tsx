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

export const getMillisDate = (dateStr: string): number => {
  let date = new Date(dateStr);
  return date.getTime();
};

export const getFullDate = (dateNum: number): string => {
  let date = new Date(dateNum);
  return date.toDateString();
};

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
      alert(JSON.stringify(data));
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
        .catch((error) => {
          alert(error.response.status);
        });
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Divider>Bölüm Detayı</Divider>
        <Form
          labelCol={{ span: 4 }}
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
            label="Bölüm Adı"
            name={"name"}
            rules={[
              { required: true, message: "Bölüm Adını girmelisiniz." },
            ]}
          >
            <Input placeholder="Bölüm Adı" />
          </Form.Item>
          <Form.Item
            label="Bölüm Açıklaması"
            name={"description"}
            rules={[
              {
                required: true,
                message: "Bölüm Açıklamasını girmelisiniz.",
              },
            ]}
          >
            <Input placeholder="Bölüm Açıklaması" />
          </Form.Item>

          <Space direction="horizontal" size={12}>
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginBottom: 16 }}
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
