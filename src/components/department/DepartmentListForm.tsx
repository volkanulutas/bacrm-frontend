import React, { useState, useEffect } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Button, Table, Modal, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  getAllDepartment,
  deleteDepartment,
} from "../../service/department.service";

interface Department {
  id: React.Key;
  name: string;
  description: string;
}

type DataIndex = keyof Department;

export const getFullDate = (dateNum: number): string => {
  let date = new Date(dateNum);
  return date.toDateString();
};

const DepartmentListForm = () => {
  const navigation = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, contextHolder] = Modal.useModal();

  const confirm = (id: number) => {
    modal.confirm({
      title: "Silme Onayı",
      icon: <CloseCircleOutlined />,
      content: "Silmek İstediğinize Emin Misiniz?",
      okText: "Sil",
      cancelText: "Vazgeç",
      onOk: () => {
        removeDepartment(id);
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);
  const columns: ColumnsType<Department> = [
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
      dataIndex: "description",
      filterSearch: true,
      width: "25%",
      // TODO:    ...getColumnSearchProps('definition'),
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortDirections: ["descend", "ascend"],
    },
    // TODO: uygun element kullanarak Dept. a ait kullanıcıları details da göster.
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
              <Space>
                <Button
                  type="primary"
                  shape="circle"
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => confirm(parseInt(record.id + "", 10))}
                ></Button>
              </Space>
            </Space>
            {contextHolder}
          </div>
        ) : null,
    },
  ];

  const getData = async () => {
    await getAllDepartment().then((res) => {
      setLoading(false);
      setDataSource(res.data);
    }).catch( (ex) => {
      setLoading(true)
    });
  };

  const removeDepartment = async (id: number) => {
    await deleteDepartment(id).then((res) => {
      setLoading(false);
      window.location.reload();
    });
  };

  const onChange: TableProps<Department>["onChange"] = (
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
