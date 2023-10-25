import React, { useState, useEffect } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import {
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { getAll } from "../../service/work.service";

interface Work {
  id: React.Key;
  name: string;
  definition: string;
  workloadHour: number;
  planningDate: number;
  startDate: number;
  endDate: number;
}

type DataIndex = keyof Work;

export const getFullDate = (dateNum: number): string => {
  let date = new Date(dateNum);
  return date.toDateString();
};

const WorkListForm = () => {
  const navigation = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const columns: ColumnsType<Work> = [
    {
      title: "No",
      dataIndex: "id",
      filterSearch: true,
      width: "5%",
    },

    {
      title: "İş Adı",
      dataIndex: "name",
      filterSearch: true,
      width: "10%",
      // TODO:    ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Açıklama",
      dataIndex: "definition",
      filterSearch: true,
      width: "25%",
      // TODO:    ...getColumnSearchProps('definition'),
      sorter: (a, b) => a.definition.localeCompare(b.definition),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "İş Süresi",
      dataIndex: "workloadHour",
      filterSearch: true,
      width: "10%",
      // TODO:    ...getColumnSearchProps('status'),
      sorter: (a, b) => a.workloadHour - b.workloadHour,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Planlama Zamanı",
      dataIndex: "planningDate",
      filterSearch: true,
      // TODO:    ...getColumnSearchProps('planningDate'),
      render: (date: number) => getFullDate(date),
      sorter: (a, b) => a.planningDate - b.planningDate,
      width: "15%",
    },
    {
      title: "Başlama Zamanı",
      dataIndex: "startDate",
      render: (date: number) => getFullDate(date),
      // TODO:    ...getColumnSearchProps('startDate'),
      sorter: (a, b) => a.startDate - b.startDate,
      filterSearch: true,
      width: "15%",
    },
    {
      title: "Bitiş Zamanı",
      dataIndex: "endDate",
      render: (date: number) => getFullDate(date),
      sorter: (a, b) => a.endDate - b.endDate,
      // TODO:    ...getColumnSearchProps('endDate'),
      filterSearch: true,
      width: "15%",
    },
    {
      title: "İşlemler",
      dataIndex: "action",
      render: (_, record: { id: React.Key }) =>
        dataSource.length >= 1 ? (
          <div>
            <Button
              type="primary"
              shape="circle"
              onClick={() => navigateTo(record.id)}

              icon={<QuestionCircleOutlined />}
            ></Button>
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

  const onChange: TableProps<Work>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const navigateTo = (id: React.Key) => {
    navigation(`/work-detail/${id}`);
  };

  // TODO: table filter, sorter ekle
  return (
    <div>
     
      <h2>İş Listesi</h2>
      <Button type="primary" onClick={() => navigateTo(-1)}>
        Yeni İş Ekle
      </Button>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} />
      
    </div>
  );
};
export default WorkListForm;
