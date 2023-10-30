import React, { useRef, useState, useEffect } from "react";
import { Table, Space, Button, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import moment from "moment";

import { getAll, deleteUser } from "../../service/employee.service";

interface Department {
  name: string;
}

interface Employee {
  id: React.Key;
  name: string;
  middleName: string;
  surname: string;
  employeeName: string;
  title: string;
  department: Department;
  email: string;
  telephoneNumber: string;
  startDate: number;
  birthdate: number;
  cellPhone: string;
}
type DataIndex = keyof Employee;

export const getFullDate = (dateNum: number): string => {
  let date = new Date(dateNum);
  return date.toDateString();
};
const EmployeeListForm = () => {
  const navigation = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [loading, setLoading] = useState(true);
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getAll().then((res) => {
      setLoading(false);
      setDataSource(res.data);
    }).catch( (ex) => {
      setLoading(true)
    });
  };

  const deleteConfirm = (id: number) => {
    modal.confirm({
      title: "Silme Onayı",
      icon: <CloseCircleOutlined />,
      content: "Silmek İstediğinize Emin Misiniz?",
      okText: "Sil",
      cancelText: "Vazgeç",
      onOk: () => {
        removeUser(id);
      },
    });
  };

  const removeUser = async (id: number) => {
    await deleteUser(id).then((res) => {
      setLoading(false);
      window.location.reload();
    });
  };
  const navigateTo = (id: React.Key) => {
    navigation(`/employee-detail/${id}`);
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<Employee> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<Employee> = [
    {
      title: "No",
      dataIndex: "id",
      filterSearch: true,
      width: "5%",
    },
    {
      title: "Çalışan Adı",
      dataIndex: "employeeName",
      // key: 'name',
      width: "30%",
      render: (text, record) => {
        const middleName = (record.middleName ? record.middleName : "") + " ";
        return record.name + " " + middleName + record.surname;
      },
      //...getColumnSearchProps('employeeName'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ünvanı",
      dataIndex: "title",
      key: "title",
      //...getColumnSearchProps('title'),
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Bölüm",
      // key: "department",
      dataIndex: "department",
      render: (text, record) => {
        return record?.department?.name;
      },
      //...getColumnSearchProps('department'),
      sorter: (a, b) => a.department.name.localeCompare(b.department.name),
      sortDirections: ["descend", "ascend"],
    },

    {
      title: "E-Posta",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Telefon",
      dataIndex: "cellPhone",
      key: "cellPhone",
      ...getColumnSearchProps("telephoneNumber"),
    },
    {
      title: "İşe Giriş Tarihi",
      dataIndex: "startDate",
      //key: "startDate",

      // ...getColumnSearchProps("startDate"), //TODO: number a göre arıyor rander et
      render: (date: number) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
      sorter: (a, b) => a.startDate - b.startDate,
      sortDirections: ["descend", "ascend"],
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
              <Space>
                <Button
                  type="primary"
                  shape="circle"
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => deleteConfirm(parseInt(record.id + "", 10))}
                ></Button>
              </Space>
            </Space>
            {contextHolder}
          </div>
        ) : null,
    },
  ];
  return (
    <div>
      <Space direction="vertical">
        <h2>Çalışanlar</h2>
        <Button type="primary" onClick={() => navigateTo(-1)} className="bacrm-margin-bottom">
          Yeni Çalışan Ekle
        </Button>   
        </Space>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};
export default EmployeeListForm;
