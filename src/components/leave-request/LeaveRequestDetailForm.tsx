import { useState, useEffect } from "react";
import moment from "moment";
import authUserId from "../../service/auth-user-id";
import { useParams, useNavigate } from "react-router-dom";
import {
  Cascader,
  Divider,
  DatePicker,
  Button,
  Form,
  Input,
  Select,
  Space,
  Spin,
} from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";

import {
  getLeaveType,
  getFreeLeaveType,
  getPaidLeaveType,
  addLeave,
  getLeaveById,
} from "../../service/leave.service";

import { getEmployeeById } from "../../service/employee.service";

interface LeaveType {
  label: string;
  value: string;
}

interface User {
  id: number;
  name: string;
  surname: string;
  startDate:number,
}

interface Leave {
  id: string;
  type: LeaveType;
  typeLabel: string;
  status: string;
  startDate: number;
  endDate: number;
  definition: string;
  workStartDate: number;
  user: User;
  employeeName: string;
  rejectMessage: string;
}

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

const LeaveRequestDetailForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [optionsLeaveType, setOptionsLeaveType] = useState<Option[]>([]);
  const [childrenOptionFreeLeave, setChildrenOptionFreeLeave] = useState<
    Option[]
  >([]);
  const [childrenOptionPaidLeave, setChildrenOptionPaidLeave] = useState<
    Option[]
  >([]);
  const [item, setItem] = useState<Leave>();
  const [size, setSize] = useState<SizeType>("middle");
  const [form] = Form.useForm();

  useEffect(() => {
    getLeaveType().then((res) => {
      setOptionsLeaveType(res.data);
      setLoading(false);
    });
    getFreeLeaveType().then((res) => {
      setChildrenOptionFreeLeave(res.data);
    });
    getPaidLeaveType().then((res) => {
      setChildrenOptionPaidLeave(res.data);
    });
    getData({ id }.id + "").then((res) => {});
  }, [id, form]);

  const getData = async (id: string) => {
    if (id === "-1") {
      return;
    }
    setLoading(true);
    await getLeaveById(id).then((res) => {
      setLoading(false);
      const data = res.data;
      setItem(data);
      form.setFieldsValue({
        id: data.id,
        type: data.type,
        status: data.status,
        typeLabel: data.type.label,
        startDate: data.startDate,
        endDate: data.endDate,
        definition: data.definition,
        user: data.user,
      });
    });
  };

  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];

    // load options lazily
    setTimeout(() => {
      targetOption.children = [];
      targetOption.children =
        targetOption.value === "MAIN_FREE"
          ? childrenOptionFreeLeave
          : childrenOptionPaidLeave;
      setOptionsLeaveType([...optionsLeaveType]);
    }, 1000);
  };

  const onFinish = (values: any) => {
    getEmployeeById(authUserId()).then((res) => {
      const userData = res.data;
      const data = {
        id: values.id,
        type: { label: values.type[1], value: values.type.value},
        startDate: moment(values.startEndDate[0]).valueOf(),
        endDate: moment(values.startEndDate[1]).valueOf(),
        user: userData,
        definition: values.definition,
        status: "WAITING",
      };
      addLeave(data).then((res) => {
        setLoading(true);
        setTimeout(() => {
          form.resetFields();
          setLoading(false);
          navigate("/leave-request-list", { replace: true });
        }, 500);
      });
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Spin spinning={loading}>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Divider orientation="center">İzin Girişi</Divider>
          <Form.Item
            name="startEndDate"
            label="İzin Başlangıç Bitiş Tarihi"
            rules={[{ required: true }]}
          >
            <RangePicker
              size={size}
              placeholder={["Başlangıç Tarihi", "Bitiş Tarihi"]}
              className="bacrm-date-picker"
            />
          </Form.Item>
        
          <Form.Item label="Açıklama" name="definition">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="typeLabel"
            label="İzin Türü:"
            rules={[{ required: true }]}
          >
            <Cascader
              options={optionsLeaveType}
              loadData={loadData}
              onChange={onChange}
              changeOnSelect
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Space>
                <Button type="primary" htmlType="submit">
                  Onaya Gönder
                </Button>
              </Space>
              <Space>
                <Button htmlType="button" onClick={onReset}>
                  Temizle
                </Button>
              </Space>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};
export default LeaveRequestDetailForm;
