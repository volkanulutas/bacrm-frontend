import React, { useEffect, useState, useRef } from "react";
import { Button, Table, Space, Modal, Input } from "antd";
import type { ColumnsType, TableProps, ColumnType} from "antd/es/table";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import type { FilterConfirmProps } from "antd/es/table/interface";
import type { InputRef } from "antd";

import authUserId from "../../service/auth-user-id";
import { getLeavesByUserId } from "../../service/leave.service";

interface LeaveType {
  label: string;
  value: string;
}

interface User {
  id: number;
  name: string;
  surname: string;
  startDate:number,
}
interface Leave {
  id: string;
  type: LeaveType;
  typeLabel: string;
  status: string;
  startDate: number;
  endDate: number;
  definition: string;
  workStartDate: number;
  user: User;
  employeeName: string;
  rejectMessage: string;
}
type DataIndex = keyof Leave;

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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, contextHolder] = Modal.useModal();
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
  ): ColumnType<Leave> => ({
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

  const columns: ColumnsType<Leave> = [
    {
      title: "İzin No:",
      dataIndex: "id",
      width: "15%",
    },
    {
      title: "İzin Türü",
      dataIndex: "typeLabel",
      key: "typeLabel",
      width: "10%",
      ...getColumnSearchProps("typeLabel"),
    },
    {
      title: "İzin Durumu:",
      dataIndex: "status",
      render: (text, record) => {
        return record.status;
      },
      onFilter: (value: any, record) => record.status.startsWith(value),
      width: "15%",
    },
    {
      title: "İzin Başlangıcı:",
      dataIndex: "startDate",
      key: "startDate",
      width: "15%",
      ...getColumnSearchProps("startDate"),
      render: (date: number) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
      sorter: (a, b) => a.startDate - b.startDate,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "İzin Bitişi:",
      dataIndex: "endDate",
      width: "15%",
      ...getColumnSearchProps("endDate"),
      render: (date: number) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
      sorter: (a, b) => a.endDate - b.endDate,
    },
    {
      title: "Açıklama:",
      dataIndex: "definition",
      width: "40%",
      ...getColumnSearchProps("definition"),
    },
  ];

  const getData = async () => {
    await getLeavesByUserId(authUserId())
      .then((res) => {
        const data = res.data.map((item: Leave) => ({
          id: item.id.toString(),
          type: item.type,
          status: item.status,
          startDate: item.startDate,
          endDate: item.endDate,
          definition: item.definition,
          user: item.user,
          typeLabel: item.type.label,
          workStartDate: item.user.startDate,
          employeeName: item.user.name + " " + item.user.surname,
        }));
        alert(JSON.stringify(data));
        setLoading(false);
        setDataSource(data);
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
