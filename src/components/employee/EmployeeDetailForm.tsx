import React, { useRef, useState, useEffect } from "react";
import "../../styles.css";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import moment, { Moment } from "moment";
import { useParams } from "react-router-dom";
import {
  getEmployeeById,
  createEmployee,
} from "../../service/employee.service";
import { getAllDepartment } from "../../service/department.service";

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

interface Department {
  id: string;
  name: string;
  description: string;
  deleted: boolean;
}

interface Employee {
  id: React.Key;
  name: string;
  middleName: string;
  surname: string;
  employeeName: string;
  title: string;
  department: Department;
  email: string;
  password: string;
  cellPhone: string;
  internalPhone: string;
  startDate: Moment;
  birthdate: Moment;
  address: string;
}

const EmployeeDetailForm = () => {
  const { id } = useParams();
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);

  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const [form] = Form.useForm<Employee>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Employee>();

  useEffect(() => {
    getData({ id }.id + "").then((res) => {});
    getDepartmentData();
  }, [id, form]);

  const getDepartmentData = async () => {
    setLoading(true);
    await getAllDepartment().then((res) => {
      setLoading(false);
      const data = res.data;
      setDepartmentList(data);
    });
  };

  const getData = async (id: string) => {
    if (id === "-1") {
      return;
    }
    setLoading(true);
    await getEmployeeById(id).then((res) => {
      setLoading(false);
      const data = res.data;
      setItem(data);
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        surname: data.surname,
        middleName: data.middleName,
        title: data.title,
        department: data.department.name,
        cellPhone: data.cellPhone,
        internalPhone: data.internalPhone,
        email: data.email,
        startDate: moment(data.startDate),
        birthdate: moment(data.birthdate),
        address: data.address,
      });
    });
  };
  const onFinish = (values: any) => {
    const data = {
      id: values.id,
      name: values.name,
      surname: values.surname,
      middleName: values.middleName,
      title: values.title,
      department: departmentList.find(
        (dept) => dept.name === values.department
      ),
      cellPhone: values.cellPhone,
      internalPhone: values.internalPhone,
      email: values.email,
      password: values.password,
      startDate: moment(values.startDate).valueOf(),
      birthdate: moment(values.birthdate).valueOf(),
      address: values.address,
    };
    createEmployee(data).then((res) => {
      setLoading(true);
      setTimeout(() => {
        form.resetFields();
        setLoading(false);
        navigate("/employee-list", { replace: true });
      }, 500);
    });
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
            label="İsim"
            name={"name"}
            rules={[{ required: true, message: "İsim girmelisiniz." }]}
          >
            <Input placeholder="İsim giriniz." />
          </Form.Item>
          <Form.Item
            label="Soyisim"
            name={"surname"}
            rules={[{ required: true, message: "Soyisim girmelisiniz." }]}
          >
            <Input placeholder="Soyisim giriniz." />
          </Form.Item>
          <Form.Item
            label="Ünvan"
            name={"title"}
            rules={[{ required: true, message: "Ünvan girmelisiniz." }]}
          >
            <Input placeholder="Ünvanınızı giriniz." />
          </Form.Item>
          <Form.Item
            label="Şifre"
            name={"password"}
            rules={[{ required: true, message: "Şifre girmelisiniz." }]}
          >
            <Input placeholder="Şifre giriniz." />
          </Form.Item>
          <Form.Item
            label="Departman:"
            name="department"
            rules={[{ required: true, message: "Depertman seçmelisiniz." }]}
          >
            <Select style={{ width: 200 }} placeholder="Seçiniz">
              {departmentList.map((item: Department) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
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
            <InputNumber placeholder="Dahili Telefon" />
          </Form.Item>
          <Form.Item
            label="E-Posta Adresi"
            name={"email"}
            rules={[
              { required: true, message: "E-Posta Adresi girmelisiniz." },
            ]}
          >
            <Input placeholder="E-Posta" />
          </Form.Item>
          <Form.Item
            label="İşe Giriş Tarihi"
            name={"startDate"}
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
