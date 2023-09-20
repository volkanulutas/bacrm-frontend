import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Button, Form, Input, Popconfirm, Table, Space } from "antd";
import type { FormInstance } from "antd/es/form";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {CheckCircleOutlined,CloseCircleOutlined,QuestionCircleOutlined} from'@ant-design/icons';

interface DataType {
  id: React.Key;
  proposalId: string;
  customerName: string;
  definition: string,
  date: string;
}

const data: DataType[] = [
  {
    id: "1",
    proposalId: "BA-001",
    definition: "Açıklama 1",
    customerName: "Arel Üniversitesi Satın Alma Birimi",
    date: new Date(1694804073100).toLocaleDateString(),
  },
  {
    id: "2",
    proposalId: "BA-002",
    definition: "Açıklama 2",
    customerName: "Medical Park",
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

const ProposalListForm = () => {
  const navigation = useNavigate();

  const columns: ColumnsType<DataType> = [
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
      onFilter: (value: any, record) => record.customerName.startsWith(value),
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
      onFilter: (value: any, record) => record.customerName.startsWith(value),
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
        data.length >= 1 ? (
          <div>
            <Button type="primary" shape="circle" onClick={navigateTo} icon={<QuestionCircleOutlined/>}></Button>
          </div>
        ) : null,
    },
  ];
   
const navigateTo = () => {
  navigation("/proposal-detail-form");
};
  return(
    <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );

  };

export default ProposalListForm;
