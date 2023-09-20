import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  Spin,
  Space,
} from "antd";
const { TextArea } = Input;

const WorkDetailForm = () => {
  const [loading, setLoading] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    alert(values.nameSurname);
    // make api call
    setLoading(true);
    setTimeout(() => {
      form.resetFields();
      setLoading(false);
    }, 500);
  };
  return (
    <div>
      <h2>İş Detayı</h2>
      <Spin spinning={loading}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          disabled={componentDisabled}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="No"
            name={"id"}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="İş Adı"
            name={"name"}
            rules={[{ required: true, message: "İş Adını girmelisiniz." }]}
          >
            <Input placeholder="İş Adını giriniz." />
          </Form.Item>
          <Form.Item
            label="İş Açıklaması"
            name={"definition"}
            rules={[{ required: false, message: "İş Açıklamasını girmelisiniz." }]}
          >
            <Input placeholder="İş Açıklamasını giriniz." />
          </Form.Item>

          <Form.Item
            label="Durum"
            name={"status"}
            rules={[{ required: false, message: "Durum girmelisiniz." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Planlama Zamanı"
            name={"planningDate"}
            rules={[{ required: false, message: "Planlama Zamanı girmelisiniz." }]}
          >
               <DatePicker placeholder="Planlama zamanını giriniz." />
          </Form.Item>
          <Form.Item
            label="Başlangıç Zamanı"
            name={"startDate"}
            rules={[{ required: false, message: "Başlangıç Zamanı girmelisiniz." }]}
          >
               <DatePicker placeholder="Başlangıç zamanını giriniz." />
          </Form.Item>

          <Form.Item
            label="Bitiş Zamanı"
            name={"endDate"}
            rules={[{ required: false, message: "Bitiş Zamanı girmelisiniz." }]}
          >
               <DatePicker placeholder="Bitiş zamanını giriniz." />
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
              Reset
            </Button>
          </Space>
        </Form>
      </Spin>
    </div>
  );
};
export default WorkDetailForm;
