import React, { useRef, useEffect, useState } from "react";
import { Button, Table, Space, Modal, Input, InputRef } from "antd";
import type { ColumnsType, TableProps, ColumnType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { deleteProposal, getAllProposal } from "../../service/proposal.service";

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
  date: number;
  customer: Customer;
}

interface Department {
  id: string;
  name: string;
}

type DataIndex = keyof Proposal;

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
  const [modal, contextHolder] = Modal.useModal();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  useEffect(() => {
    getData();
  }, []);

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
  ): ColumnType<Proposal> => ({
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

  const columns: ColumnsType<Proposal> = [
    {
      title: "Teklif No:",
      dataIndex: "proposalId",
      ...getColumnSearchProps("proposalId"),
      width: "20%",
    },
    {
      title: "Müşteri Adı",
      dataIndex: "customerName",
      render: (text, record) => {
        return record.customer.name;
      },
      // ...getColumnSearchProps("record.customer.name"),
      width: "30%",
    },
    {
      title: "Açıklama",
      dataIndex: "definition",
      width: "50%",
    },
    {
      title: "Teklif Tarihi:",
      dataIndex: "date",
      render: (date: number) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
      sorter: (a, b) => a.date - b.date,
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

  const getData = async () => {
    await getAllProposal()
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((ex) => {
        setLoading(true);
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
        removeProposal(id);
      },
    });
  };

  const removeProposal = async (id: number) => {
    await deleteProposal(id).then((res) => {
      setLoading(false);
      window.location.reload();
    });
  };

  const navigateTo = (id: React.Key) => {
    navigation(`/proposal-detail/${id}`);
  };
  return (
    <div>
      <Space direction="vertical">
        <h2>Teklif Listesi</h2>
        <Button
          type="primary"
          onClick={() => navigateTo(-1)}
          className="bacrm-margin-bottom"
        >
          Yeni Teklif Ekle
        </Button>
      </Space>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} />
    </div>
  );
};

export default ProposalListForm;
