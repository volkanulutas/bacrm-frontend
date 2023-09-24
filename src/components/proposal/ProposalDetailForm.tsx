import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Divider } from "antd";
import type { FormInstance } from "antd/es/form";
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

const ProposalDetailForm = () => {
const [loading, setLoading] = useState(false);
const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
const [form] = Form.useForm();
  const onFinish = (values: any) => {

    // make api call
    setLoading(true);
    setTimeout(() => {
      form.resetFields();
      setLoading(false);
    }, 500);
  };
  return (
    <div>
      <Divider>Teklif Detayı</Divider>
      <div>
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
            label="Teklif No"
            name={"id"}
            rules={[{ required: true, message: "Teklif No girmelisiniz." }]}
          
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="Müşteri Adı"
            name={"customerName"}
            rules={[{ required: true, message: "Müşteri Adını girmelisiniz." }]}
          >
            <Input placeholder="Müşteri Adını giriniz." />
          </Form.Item>
          <Form.Item
            label="Açıklama"
            name={"definition"}
            rules={[{ required: false, message: "Açıklamayı girmelisiniz." }]}
          >
            <Input placeholder="Açıklamayı giriniz." />
          </Form.Item>
          <Form.Item
            label="Teklif Tarihi"
            name={"date"}
            rules={[{ required: false, message: "Teklif Tarihini girmelisiniz." }]}
          >
               <DatePicker placeholder="Teklif Tarihini giriniz." />
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
    </div>
  );
};

export default ProposalDetailForm;
