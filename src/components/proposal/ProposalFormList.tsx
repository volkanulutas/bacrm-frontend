import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Button, Form, Input, Popconfirm, Table, Space } from "antd";
import type { FormInstance } from "antd/es/form";
import type { ColumnsType, TableProps } from "antd/es/table";

interface DataType {
  key: React.Key;
  proposalId: string;
  customerName: string;
  date: string;
}

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
    title: "Teklif Tarihi:",
    dataIndex: "date",
    // TODO: sorter: (a, b) => a.date - b.date,
  },

  {
    title: "İşlemler",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Detay</a>
        <a>Sil</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    proposalId: "BA-001",
    customerName: "Arel Üniversitesi Satın Alma Birimi",
    date: new Date(1694804073100).toLocaleDateString(),
  },
  {
    key: "2",
    proposalId: "BA-002",
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

const ProposalFormList: React.FC = () => (
  <Table columns={columns} dataSource={data} onChange={onChange} />
);

export default ProposalFormList;
