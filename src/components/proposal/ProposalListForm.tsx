import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Button, Form, Input, Popconfirm, Table, Space } from "antd";
import type { FormInstance } from "antd/es/form";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {CheckCircleOutlined,CloseCircleOutlined,QuestionCircleOutlined} from'@ant-design/icons';
import { getAll } from "../../service/proposal.service";

interface Customer {
  id: string;
  name: string;
  definition: string;
  address: string;
  telephone: string;
}
interface Proposal {
  id: React.Key;
  proposalId: string;
  definition: string;
  date: number,
  customer: Customer;
}

const onChange: TableProps<Proposal>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const ProposalListForm = () => {
  const navigation = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const columns: ColumnsType<Proposal> = [
    {
      title: "Teklif No:",
      dataIndex: "proposalId",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value: any, record) => record.proposalId.startsWith(value),
      filterSearch: true,
      width: "40%",
    },
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      render: (text, record) => {
        return record.customer.name;
      },
      filters: [
        {
          text: "Arel Üniversite Satın Alma Birimi",
          value: "Arel Üniversite Satın Alma Birimi",
        },
        {
          text: "Category 1",
          value: "Category 1",
        },
        {
          text: "Category 2",
          value: "Category 2",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record) => record.customer.name.startsWith(value),
      width: "30%",
    },
    {
      title: "Açıklama",
      dataIndex: "definition",
      filters: [
        {
          text: "Arel Üniversite Satın Alma Birimi",
          value: "Arel Üniversite Satın Alma Birimi",
        },
        {
          text: "Category 1",
          value: "Category 1",
        },
        {
          text: "Category 2",
          value: "Category 2",
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: any, record) => record.customer.name.startsWith(value),
      width: "30%",
    },
    {
      title: "Teklif Tarihi:",
      dataIndex: "date",
      // TODO: sorter: (a, b) => a.date - b.date,
    },
  
    {
      title: 'İşlemler',
      dataIndex: 'action',
      render: (_, record: { id: React.Key }) =>
        dataSource.length >= 1 ? (
          <div>
            <Button type="primary" shape="circle" onClick={() => navigateTo(record.id)} icon={<QuestionCircleOutlined/>}></Button>
          </div>
        ) : null,
    },
  ];

  const getData = async () => {
    await getAll().then((res) => {
      setLoading(false);
      setDataSource(res.data);
    });
  };
const navigateTo = (id: React.Key) => {
  navigation(`/proposal-detai/${id}`);
};
  return(
    <div>
       <h2>Teklif Listesi</h2>
      <Button type="primary" onClick={() => navigateTo(-1)}>
        Yeni Teklif Ekle
      </Button>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} />
    </div>
  );

  };

export default ProposalListForm;
