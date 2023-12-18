import React, { useEffect, useState } from "react";
import { Button, Table, Space, Modal } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { EditOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { getAllLeaves } from "../../service/leave.service";

interface Leave {
  id: React.Key;
  type: string;
  status: string;
  startDate: number;
  endDate: number;
  definition: string;
}

const onChange: TableProps<Leave>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};

const LeaveRequestListForm = () => {
  const navigation = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, contextHolder] = Modal.useModal();
  useEffect(() => {
    getData();
  }, []);
  const columns: ColumnsType<Leave> = [
    {
      title: "İzin No:",
      dataIndex: "id",
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
      // onFilter: (value: any, record) => record.id.startsWith(value),
      filterSearch: true,
      width: "40%",
    },
    {
      title: "İzin Türü",
      dataIndex: "type",
      render: (text, record) => {
        return record.type;
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
      onFilter: (value: any, record) => record.type.startsWith(value),
      width: "30%",
    },
    {
      title: "İzin Durumu:",
      dataIndex: "status",
      render: (text, record) => {
        return record.status;
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
      onFilter: (value: any, record) => record.status.startsWith(value),
      width: "30%",
    },
    {
      title: "İzin Başlangıcı:",
      dataIndex: "startDate",
      // TODO: sorter: (a, b) => a.date - b.date,
    },
    {
      title: "İzin Bitişi:",
      dataIndex: "endDate",
      // TODO: sorter: (a, b) => a.date - b.date,
    },
    {
      title: "Açıklama:",
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
      onFilter: (value: any, record) => record.definition.startsWith(value),
      width: "30%",
    },

    {
      title: "İşlemler",
      dataIndex: "action",
      render: (_, record: { id: React.Key }) =>
        dataSource.length >= 1 ? (
          <div>
            <Space>
              <Space>
                <Button
                  type="primary"
                  shape="circle"
                  onClick={() => navigateTo(record.id)}
                  icon={<EditOutlined />}
                ></Button>
              </Space>
            </Space>
            {contextHolder}
          </div>
        ) : null,
    },
  ];

  const getData = async () => {
    await getAllLeaves()
      .then((res) => {
        alert(JSON.stringify(res.data));
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((ex) => {
        setLoading(true);
      });
  };
  const navigateTo = (id: React.Key) => {
    navigation(`/leave-request-detail/${id}`);
  };
  return (
    <div>
      <Space direction="vertical">
        <h2>İzin Taleplerim</h2>
        <Button
          type="primary"
          onClick={() => navigateTo(-1)}
          className="bacrm-margin-bottom"
        >
          Yeni İzin
        </Button>
      </Space>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} />
    </div>
  );
};

export default LeaveRequestListForm;
