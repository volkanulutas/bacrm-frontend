import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import moment from "moment";

import {
  Button,
  DatePicker,
  Form,
  Input,
  Divider,
  InputNumber,
  Spin,
  Space,
} from "antd";
import { createWork } from "../../service/work.service";
import { getWorkById } from "../../service/work.service";
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

const WorkDetailForm = () => {
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
    await getWorkById(id).then((res) => {
      setLoading(false);
      const data = res.data;
      setItem(data);
      form.setFieldsValue({
        id: data.id,
        name: data.name,
        definition: data.definition,
        workloadHour: data.workloadHour,
        endDate: moment(data.endDate),
        startDate: moment(data.startDate),
        planningDate: moment(data.planningDate),
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

    createWork(data).then((res) => {
      setLoading(true);
      setTimeout(() => {
        form.resetFields();
        setLoading(false);
        navigate("/work-list", { replace: true });
      }, 500);
    });
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Divider>İş Detayı</Divider>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          // disabled={componentDisabled}
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
            <Input placeholder="İş Adı" />
          </Form.Item>
          <Form.Item
            label="İş Açıklaması"
            name={"definition"}
            rules={[
              { required: false, message: "İş Açıklamasını girmelisiniz." },
            ]}
          >
            <Input placeholder="İş Açıklaması" />
          </Form.Item>

          <Form.Item
            label="İş Süresi (saat)"
            name={"workloadHour"}
            rules={[{ required: true, message: "İş Süresini girmelisiniz." }]}
          >
            <InputNumber placeholder="İş Süresi" min={0} step={0.5} />
          </Form.Item>
          <Form.Item
            label="Planlama Zamanı"
            name={"planningDate"}
            rules={[
              { required: true, message: "Planlama Zamanı girmelisiniz." },
            ]}
          >
            <DatePicker placeholder="Planlama Zamanı" />
          </Form.Item>
          <Form.Item
            label="Başlangıç Zamanı"
            name={"startDate"}
            rules={[
              { required: true, message: "Başlangıç Zamanı girmelisiniz." },
            ]}
          >
            <DatePicker placeholder="Başlangıç Zamanı" />
          </Form.Item>

          <Form.Item
            label="Bitiş Zamanı"
            name={"endDate"}
            rules={[{ required: true, message: "Bitiş Zamanı girmelisiniz." }]}
          >
            <DatePicker placeholder="Bitiş Zamanı" />
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
