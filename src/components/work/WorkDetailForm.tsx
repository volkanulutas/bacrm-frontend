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
  Divider,
  Spin,
  Space,
} from "antd";
import { createWork } from "../../service/work.service";
const { TextArea } = Input;



const WorkDetailForm = () => {
  const [loading, setLoading] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false); // TODO: role integratiob should be done.
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
   


    createWork(values).then((res) => {
     
      setLoading(true);
      setTimeout(() => {
        form.resetFields();
        setLoading(false);
      }, 500);
    });
    
    // make api call
  
   
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Divider>İş Detayı</Divider>
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
            label="İş Adı"
            name={"name"}
            rules={[{ required: true, message: "İş Adını girmelisiniz." }]}
          >
            <Input placeholder="İş Adını giriniz." />
          </Form.Item>
          <Form.Item
            label="İş Açıklaması"
            name={"definition"}
            rules={[
              { required: false, message: "İş Açıklamasını girmelisiniz." },
            ]}
          >
            <Input placeholder="İş Açıklamasını giriniz." />
          </Form.Item>

          <Form.Item
            label="İş Süresi"
            name={"workLoadHour"}
            rules={[{ required: true, message: "Durum girmelisiniz." }]}
          >
            <Input placeholder="İş Süresini giriniz." />
          </Form.Item>
          <Form.Item
            label="Planlama Zamanı"
            name={"planningDate"}
            rules={[
              { required: true, message: "Planlama Zamanı girmelisiniz." },
            ]}
          >
            <DatePicker placeholder="Planlama zamanını giriniz." />
          </Form.Item>
          <Form.Item
            label="Başlangıç Zamanı"
            name={"startDate"}
            rules={[
              { required: true, message: "Başlangıç Zamanı girmelisiniz." },
            ]}
          >
            <DatePicker placeholder="Başlangıç zamanını giriniz." />
          </Form.Item>

          <Form.Item
            label="Bitiş Zamanı"
            name={"endDate"}
            rules={[{ required: true, message: "Bitiş Zamanı girmelisiniz." }]}
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
              İptal
            </Button>
          </Space>
        </Form>
      </Spin>
    </div>
  );
};
export default WorkDetailForm;
