import React, { useRef, useState, useEffect } from "react";
import type { ColumnsType, TableProps, ColumnType } from "antd/es/table";
import { Button, Table, Space, Modal, Input, InputRef } from "antd";
import { useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import type { FilterConfirmProps } from "antd/es/table/interface";
import {
  EditOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getAllCustomer, deleteCustomer } from "../../service/customer.service";

interface Customer {
  id: React.Key;
  name: string;
  definition: string;
  address: string;
  telephone: string;
}

type DataIndex = keyof Customer;

const CustomerListForm = () => {
  const navigation = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, contextHolder] = Modal.useModal();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  useEffect(() => {
    getData();
  }, []);

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<Customer> => ({
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
            Arama
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Temizle
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
            Filtrele
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Kapat
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
  const columns: ColumnsType<Customer> = [
    {
      title: "No",
      dataIndex: "id",
      filterSearch: true,
      width: "5%",
    },

    {
      title: "Müşteri Adı",
      dataIndex: "name",
      filterSearch: true,
      width: "20%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Açıklama",
      dataIndex: "definition",
      width: "25%",
    },
    {
      title: "Adres",
      dataIndex: "address",
      width: "25%",
    },
    {
      title: "Telefon",
      dataIndex: "telephone",
      width: "25%",
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
    await getAllCustomer()
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((ex) => {
        setLoading(true);
      });
  };

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

  const removeDepartment = async (id: number) => {
    await deleteCustomer(id).then((res) => {
      setLoading(false);
      window.location.reload();
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
    navigation(`/customer-detail/${id}`);
  };

  // TODO: table filter, sorter ekle
  return (
    <div>
      <Space direction="vertical">
        <h2>Müşteri Listesi</h2>
        <Button
          type="primary"
          onClick={() => navigateTo(-1)}
          className="bcrm-margin-bottom"
        >
          Yeni Müşteri Ekle
        </Button>
      </Space>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} />
    </div>
  );
};
export default CustomerListForm;
