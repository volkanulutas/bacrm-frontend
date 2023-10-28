import React, { useState, useEffect } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";
import {
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { getAllDepartment } from "../../service/department.service";

interface Customer {
  id: React.Key;
  name: string;
  definition: string;
  address: string;
  telephone: string;
}

type DataIndex = keyof Customer;

export const getFullDate = (dateNum: number): string => {
  let date = new Date(dateNum);
  return date.toDateString();
};

const DepartmentListForm = () => {
  const navigation = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const columns: ColumnsType<Customer> = [
    {
      title: "No",
      dataIndex: "id",
      filterSearch: true,
      width: "5%",
    },

    {
      title: "Departman Adı",
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
    // TODO: uygun element kullanarak Dept. a ait kullanıcıları details da göster.
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
    await getAllDepartment().then((res) => {
     
      setLoading(false);
      setDataSource(res.data);
    });
  };

  const onChange: TableProps<Customer>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const navigateTo = (id: React.Key) => {
    navigation(`/department-detail/${id}`);
  };

  // TODO: table filter, sorter ekle
  return (
    <div>
     
      <h2>Departman Listesi</h2>
      <Button type="primary" onClick={() => navigateTo(-1)}>
        Yeni Departman Ekle
      </Button>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} />
      
    </div>
  );
};
export default DepartmentListForm;