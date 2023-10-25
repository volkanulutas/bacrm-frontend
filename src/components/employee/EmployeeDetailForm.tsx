import React, { useRef, useState } from "react";

import "../../styles.css";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../../service/employee.service";

import {
  Button,
  Checkbox,
  DatePicker,
  Form, 
  Input,
  InputNumber,
  Select,
  Upload,
  Spin,
  Space,
} from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface Employee {
  nameSurname: string;
}

const EmployeeDetailForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [form] = Form.useForm<Employee>();

  const handleAdd = () => {
   
  };
  const onFinish = (values: any) => {
    
 
    // make api call
    setLoading(true);
    setTimeout(() => {
      form.resetFields();
      setLoading(false);
    }, 500);
  };

  return (
    <>
    
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Spin spinning={loading}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          //disabled={componentDisabled}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Profil"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Ad Soyad"
            name={"nameSurname"}
            rules={[{ required: true, message: "Ad Soyad girmelisiniz." }]}
          >
            <Input placeholder="Ad Soyad giriniz." />
          </Form.Item>
          <Form.Item
            label="Ünvan"
            name={"title"}
            rules={[{ required: true, message: "Ünvan girmelisiniz." }]}
          >
            <Input placeholder="Ünvanınızı giriniz." />
          </Form.Item>
          <Form.Item
            label="Departman"
            name={"depertmant"}
            rules={[{ required: true, message: "Depertman girmelisiniz." }]}
          >
            <Input placeholder="Depertmanınızı giriniz." />
          </Form.Item>
          <Form.Item
            label="Cep Telefonu"
            name={"cellPhone"}
            rules={[{ required: true, message: "Cep Telefonu girmelisiniz." }]}
          >
            <Input placeholder="Cep Telefonunuzu giriniz." />
          </Form.Item>
          <Form.Item
            label="Dahili Telefon"
            name={"internalPhone"}
            rules={[
              { required: true, message: "Dahili Telefon girmelisiniz." },
            ]}
          >
            <InputNumber placeholder="Dahili telefonunuzu giriniz." />
          </Form.Item>
          <Form.Item
            label="İş E-Posta Adresi"
            name={"workPhone"}
            rules={[
              { required: true, message: "İş E-Posta Adresi girmelisiniz." },
            ]}
          >
            <Input placeholder="İş E-Posta adresinizi giriniz." />
          </Form.Item>
          <Form.Item
            label="İşe Giriş Tarihi"
            name={"employmentDate"}
            rules={[
              { required: true, message: "İşe Giriş Tarihini girmelisiniz." },
            ]}
          >
            <DatePicker placeholder="İşe giriş tarihinizi giriniz." />
          </Form.Item>
          <Form.Item
            label="Doğum Tarihi"
            name={"birthdate"}
            rules={[
              { required: true, message: "Doğum Tarihini girmelisiniz." },
            ]}
          >
            <DatePicker placeholder="Doğum tarihini giriniz." />
          </Form.Item>
          <Form.Item
            label="Adres"
            name="address"
            rules={[{ required: true, message: "Adres girmelisiniz." }]}
          >
            <TextArea rows={4} placeholder="Adresinizi giriniz." />
          </Form.Item>
          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
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
    </>
  );
};
export default EmployeeDetailForm;
