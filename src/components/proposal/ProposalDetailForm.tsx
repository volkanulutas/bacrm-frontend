import React, {  useState, useEffect } from "react";
import moment from "moment";
import { Divider } from "antd";
import { useParams } from "react-router-dom";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Spin,
  Space,
} from "antd";
import { getProposalById } from "../../service/proposal.service";

interface Customer {
  id: string;
  name: string;
  definition: string;
  address: string;
  telephone: string;
}

interface Proposal {
  id: string;
  proposalId: string;
  definition: string;
  date: number;
  customer: Customer;
}

const ProposalDetailForm = () => {
const { id } = useParams();
const [item, setItem] = useState<Proposal>();
const [loading, setLoading] = useState(false);
const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
const [form] = Form.useForm();


useEffect(() => {
  getData({ id }.id + "").then((res) => {});
}, [id, form]);


const getData = async (id: string) => {
  if(id === "-1"){return;}
  setLoading(true);
  await getProposalById(id).then((res) => {
    setLoading(false);
    const data = res.data;
    setItem(data);
    form.setFieldsValue({
      id: data.id,
      proposalId: data.proposalId,
      definition: data.definition,
      date: moment(data.date),
      customerName: data.customer.name,
      // TODO: customer bilgisini detaylı göstermek için aşağıdaki yapı sağlandı, istenirse eklenecek
      customer: {
        id: data.customer.id,
        name: data.customer.name,
        definition: data.customer.definition,
        address: data.customer.address,
        telephone: data.customer.telephone,
      }
    });
  });
};

  const onFinish = (values: any) => {
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
          // disabled={componentDisabled}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="No" name={"id"}>
            <Input placeholder="No" disabled={true} />
          </Form.Item>
          <Form.Item
            label="Teklif No"
            name={"proposalId"}
            rules={[{ required: true, message: "Teklif No girmelisiniz." }]}  
          >
            <Input placeholder="Teklif No:"/>
          </Form.Item>
          <Form.Item
            label="Müşteri Adı"
            name={"customerName"}
            rules={[{ required: true, message: "Müşteri Adını girmelisiniz." }]}
          >
            <Input placeholder="Müşteri Adı" />
          </Form.Item>
          <Form.Item
            label="Açıklama"
            name={"definition"}
            rules={[{ required: false, message: "Açıklamayı girmelisiniz." }]}
          >
            <Input placeholder="Açıklama" />
          </Form.Item>
          <Form.Item
            label="Teklif Tarihi"
            name={"date"}
            rules={[{ required: false, message: "Teklif Tarihini girmelisiniz." }]}
          >
               <DatePicker placeholder="Teklif Tarihi" />
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
