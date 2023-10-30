import React, {  useState } from "react";
import {Cascader, Divider, DatePicker,  Button, Form, Input, Select, Space } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';

const optionListsLeaveType: Option[] = [
  {
    value: 'paidLeave',
    label: 'Ücretli izin',
    isLeaf: false,
  },
  {
    value: 'freeLeave',
    label: 'Ücretsiz İzin',
    isLeaf: false,
  },
];

interface Option {
  value?: string | number | null;
  label: React.ReactNode;
  children?: Option[];
  isLeaf?: boolean;
}

const onChange = (value: (string | number)[], selectedOptions: Option[]) => {
  console.log(value, selectedOptions);
};

const { TextArea } = Input;
const { RangePicker } = DatePicker;


const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LeaveRequestForm = () => { 
  const childrenOptionFreeLeave = [
    {
    label:"İş Görmezlik Raporu",
    value: "value1"
  },
  {
    label:"İş Görmezlik Raporu (6 Hafta)",
    value: "value2"
  },
  {
    label:"Ücretsiz Doğum İzni",
    value: "value3"
  },
  {
    label:"Ücretsiz Doğum İzni",
    value: "value4"
  },
  {
    label:"Mazeret İzni",
    value: "value5"
  },

];
  const childrenOptionPaidLeave = [{
    label:"Yıllık İzin",
    value: "value6"
  }]; 

  const [optionsLeaveType, setOptionsLeaveType] = useState<Option[]>(optionListsLeaveType);
  const loadData = (selectedOptions: Option[]) => 
  {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    // load options lazily
    setTimeout(() => {
      targetOption.children = [];
      targetOption.children = targetOption.value === "freeLeave" ? childrenOptionFreeLeave: childrenOptionPaidLeave;
      setOptionsLeaveType([...optionsLeaveType]);
    }, 1000);
  };
  const [size, setSize] = useState<SizeType>('middle');
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };
	
	return (
    <div>
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
          <Divider orientation="center">İzin Girişi
          </Divider>
          <Form.Item name="leaveStartEndDate" label="İzin Başlangıç Bitiş Tarihi" rules={[{ required: true }]}>
            <RangePicker size={size} placeholder={['Başlangıç Tarihi', 'Bitiş Tarihi']} className="bacrm-date-picker" />
          </Form.Item>
          <Form.Item label="İşe Başlama Tarihi">
            <DatePicker placeholder="İşe Başlama Tarihi" className="bacrm-date-picker"/>
          </Form.Item>
            <Form.Item label="Açıklama">
              <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="leaveType" label="İzin Tipi:" rules={[{ required: true }]}> 
            <Cascader options={optionsLeaveType} loadData={loadData} onChange={onChange} changeOnSelect />
          </Form.Item>      
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit" className="bacrm-margin-right">
                Onaya Gönder
              </Button>
            </Space>
            <Space>
              <Button htmlType="button" onClick={onReset}>
                Temizle
             </Button>
            </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
export default LeaveRequestForm;










