import React, { useRef, useState } from "react";

import './styles.css';
import { PlusOutlined } from '@ant-design/icons';

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
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const EmployeeEditForm: React.FC =() => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const handleAdd = () => {alert("derya")}

  return (
   
    <>
    <Checkbox
      checked={componentDisabled}
      onChange={(e) => setComponentDisabled(e.target.checked)}
    >
      Form disabled
    </Checkbox>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      disabled={componentDisabled}
      style={{ maxWidth: 600 }}

    >
       <Form.Item label="Profil" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>
     
    
       
  
      <Form.Item label="Ad Soyad">
        <Input/>
      </Form.Item>
      <Form.Item label="Ünvan">
        <Input/>
      </Form.Item>
      <Form.Item label="Departman">
        <Input/>
      </Form.Item>
      <Form.Item label="Cep Telefonu">
        <Input/>
      </Form.Item>
      <Form.Item label="Dahili Telefon">
        <InputNumber />
      </Form.Item>
      <Form.Item label="İş E-Posta Adresi">
        <Input/>
      </Form.Item>
      <Form.Item label="İşe Giriş Tarihi">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Doğum Tarihi">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Adres">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item label="Select">
        <Select>
          <Select.Option value="demo">Demo</Select.Option>
        </Select>
      </Form.Item>
    
     
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Kaydet
      </Button>
    </Form>
  </>
);
  
};
export default EmployeeEditForm;
