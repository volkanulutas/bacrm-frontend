import { useState, useEffect } from "react";
import moment from "moment";
import { Divider, Select } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { Button, DatePicker, Form, Input, Spin, Space } from "antd";
import {
  getProposalById,
  createProposal,
} from "../../service/proposal.service";
import { getAllCustomer } from "../../service/customer.service";

interface Customer {
  id: string;
  name: string;
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
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomerData();
    getData({ id }.id + "").then((res) => {});
  }, [id, form]);

  const getCustomerData = async () => {
    setLoading(true);
    await getAllCustomer().then((res) => {
      setCustomerList(res.data);
      setLoading(false);
    });
  };

  const getData = async (id: string) => {
    if (id === "-1") {
      return;
    }
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
        customerId: data.customer.name,
        customer: {
          id: data.customer.id,
          name: data.customer.name,
          definition: data.customer.definition,
          address: data.customer.address,
          telephone: data.customer.telephone,
        },
      });
    });
  };

  const onFinish = (values: any) => {
    const data = {
      id: values.id,
      proposalId: values.proposalId,
      customer: customerList.find((obj) => obj.id === values.customerId),
      date: moment(values.date).valueOf(),
      definition: values.definition,
    };

    createProposal(data).then((res) => {
      setLoading(true);
      setTimeout(() => {
        form.resetFields();
        setLoading(false);
        navigate("/proposal-list", { replace: true });
      }, 500);
    });
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
              <Input
                placeholder="Teklif No"
                disabled={id === "-1" ? false : true}
              />
            </Form.Item>
            <Form.Item
              label="Müşteri:"
              name="customerId"
              rules={[{ required: true, message: "Müşteri seçmelisiniz." }]}
            >
              <Select style={{ width: 200 }} placeholder="Seçiniz">
                {customerList.map((item: Customer) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
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
              rules={[
                { required: false, message: "Teklif Tarihini girmelisiniz." },
              ]}
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
