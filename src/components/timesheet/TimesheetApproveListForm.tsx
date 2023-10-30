import React from "react";
import { Button, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import {QuestionCircleOutlined} from'@ant-design/icons';

interface DataType {
  id: React.Key;
  employeeId: number;
  status: string;
  department:string;
  employeeName:string;
  date: string;
}

const data: DataType[] = [
  {
    id: "1",
    employeeId: 1,
    employeeName:"Derya taş",
   department:"",
   status: "Arel Üniversitesi Satın Alma Birimi",
    date: new Date(1694804073100).toLocaleDateString(),
  },
  {
    id: "2",
    employeeId: 2,
    employeeName:"Derya ulutaştaş",
    department:"",
    status: "Medical Park",
    date: new Date(1694804073100).toLocaleDateString(),
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};
const TimesheetApproveListForm = () => {
  const navigation = useNavigate();

  const columns: ColumnsType<DataType> = [
    {
      title: "Çalışan No",
      dataIndex: "employeeId",
      // TODO: sorter: (a, b) => a.date - b.date,
    },
    
    {
      title: "Çalışan Adı:",
      dataIndex: "employeeName",
      // TODO: sorter: (a, b) => a.date - b.date,
    },
     
    {
      title: "Bölüm:",
      dataIndex: "department",
      // TODO: sorter: (a, b) => a.date - b.date,
    },
    
    {
      title: "İşçilik  Tarihi:",
      dataIndex: "date",
      // TODO: sorter: (a, b) => a.date - b.date,
    },
    
    {
      title: "Onay Durumu",
      dataIndex: "status",
      filters: [
        {
          text: "Arel Üniversite Satın Alma Birimi",
          value: "Arel Üniversite Satın Alma Birimi",
        },
        {
          text: "onaylandı",
          value: "Category 1",
        },
        {
          text: "reddedildi",
          value: "Category 2",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record) => record.status.startsWith(value),
      width: "30%",
    },
    {
      title: 'Detay',
      dataIndex: 'action',
      render: (_, record: { id: React.Key }) =>
        data.length >= 1 ? (
          <div>
            <Button type="primary" shape="circle" onClick={navigateTo} icon={<QuestionCircleOutlined/>}></Button>
          </div>
        ) : null,
    },
  ];
   
const navigateTo = () => {
  navigation("/proposal-detail");
};
  return (
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};
export default TimesheetApproveListForm;
