import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  Button,
  Form,
  Input,
  Divider,
  Spin,
  Space,
} from "antd";
import { getDepartmentById } from "../../service/department.service";
const { TextArea } = Input;

interface Work {
  id: string;
  name: string;
  definition: string;
  workloadHour: number;
  endDate: number;
  startDate: number;
  planningDate: number;
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
  const [item, setItem] = useState<Work>();

  useEffect(() => {
    getData({ id }.id + "").then((res) => {});
  }, [id, form]);

  const getData = async (id: string) => {
    if(id === "-1"){return;}
    setLoading(true);
    await getDepartmentById(id).then((res) => {
      setLoading(false);
      const data = res.data;
      setItem(data);
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        definition: data.definition
      });
    });
  };

  const onFinish = (values: any) => {
    const data = {
      id: values.id,
      definition: values.definition,
      endDate: getMillisDate(values.endDate),
      name: values.name,
      planningDate: getMillisDate(values.planningDate),
      startDate: getMillisDate(values.startDate),
      workloadHour: values.workLoadHour,
    };
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Divider>Müşteri Detayı</Divider>
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
            label="Departman Adı"
            name={"name"}
            rules={[{ required: true, message: "Departman Adını girmelisiniz." }]}
          >
            <Input placeholder="Departman Adı" />
          </Form.Item>
          <Form.Item
            label="Departman Açıklaması"
            name={"definition"}
            rules={[
              { required: false, message: "Departman Açıklamasını girmelisiniz." },
            ]}
          >
            <Input placeholder="Departman Açıklaması" />
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