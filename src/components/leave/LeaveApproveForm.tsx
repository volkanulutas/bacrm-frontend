import React, { useRef, useState, useEffect } from "react";
import { Divider, Table, Space, Button, Input, Modal } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useParams, useNavigate } from "react-router-dom";
import type { InputRef } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import moment from "moment";
import authUserId from "../../service/auth-user-id";
import { getApproveLeaves, addLeave } from "../../service/leave.service";

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

const LeaveApproveForm = () => {
  const navigation = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [dataSource, setDataSource] = useState<Leave[]>([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [ rejectMessage, setRejectMessage ] = useState<string | null> (null); 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const userId = authUserId();
    await getApproveLeaves(authUserId())
      .then((res) => {
        const data = res.data.map((item: Leave) => ({
          id: item.id.toString(),
          type: item.type,
          typeLabel: item.type.label,
          status: item.status,
          startDate: item.startDate,
          endDate: item.endDate,
          definition: item.definition,
          workStartDate: item.workStartDate,
          user: item.user,
          employeeName: item.user.name + " " + item.user.surname, // Kullanıcı adı direkt olarak alınıyor
        }));
        setDataSource(data);
        setLoading(false);
      })
      .catch((ex) => {
        setLoading(true);
      });
  };

  const approveLeave = (id: string) => {
    const leave = dataSource.find((item) => item.id === id);
    if (leave) {
      const data = {
        id: leave.id.toString(),
        type: { label: leave.type.label, value: leave.type.value},
        status: "APPROVED",
        startDate: leave.startDate,
        endDate: leave.endDate,
        definition: leave.definition,
        user: leave.user,
      };
      addLeave(data).then((res) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          window.location.reload();
        }, 500);
      });
    }
  };

  const showModal = (id: string) => {
    setIsModalOpen(true);
    setSelectedItemId(id);
  };

  const reject = () => {
    if (selectedItemId) {
      const leave = dataSource.find((item) => item.id === selectedItemId);
      if (leave) {
        const data = {
          id: leave.id.toString(),
         type: { label: leave.type.label, value: leave.type.value},
          status: "REJECTED",
          startDate: moment(leave.startDate).valueOf(),
          endDate: moment(leave.endDate).valueOf(),
          definition: leave.definition,
          user: leave.user,
          rejectMessage: rejectMessage,
        };
        addLeave(data).then((res) => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            window.location.reload();
          }, 500);
        });
        setIsModalOpen(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<Leave> => ({
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
      title: "Çalışan Adı",
      dataIndex: "employeeName",
      key: "employeeName",
      width: "30%",
      ...getColumnSearchProps("employeeName"),
    },
    {
      title: "İzin Türü",
      dataIndex: "typeLabel",
      key: "typeLabel",
      width: "20%",
      ...getColumnSearchProps("typeLabel"),
    },
    {
      title: "İzin Başlangıcı",
      dataIndex: "startDate",
      key: "startDate",
      ...getColumnSearchProps("startDate"),
      render: (date: number) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
      sorter: (a, b) => a.startDate - b.startDate,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "İzin Bitişi",
      dataIndex: "endDate",
      key: "endDate",
      ...getColumnSearchProps("endDate"),
      render: (date: number) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
      sorter: (a, b) => a.endDate - b.endDate,

      sortDirections: ["descend", "ascend"],
    },

    {
      title: "İşe Başlama Tarihi",
      dataIndex: "workStartDate",
      key: "workStartDate",
      ...getColumnSearchProps("workStartDate"),
      render: (date: number) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
      sorter: (a, b) => a.workStartDate - b.workStartDate,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "İşlem",
      dataIndex: "action",
      render: (_, record: { id: React.Key }) =>
        dataSource.length >= 1 ? (
          <div>
            <Space>
              <Space>
                <Button
                  type="primary"
                  className="marginright"
                  shape="circle"
                  icon={<CheckCircleOutlined />}
                  onClick={() => approveLeave(record.id + "")}
                ></Button>
              </Space>
              <Space>
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  onClick={() => showModal(record.id + "")}
                  icon={<CloseCircleOutlined />}
                ></Button>
              </Space>
            </Space>
          </div>
        ) : null,
    },
  ];

  return (
    <div>
      <Space direction="vertical">
        <h2>İzin Onay Formu</h2>
        <Divider orientation="center">İzin Talepleri</Divider>
      </Space>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="Red Nedeni"
        // cancelButtonProps={{ style: { display: "none" } }}
        
        okText="Reddet"
        cancelText="İptal"
        open={isModalOpen}
        onOk={() => reject()}
        onCancel={handleCancel}
      >
        <Input 
         placeholder="Red Nedenini Giriniz."
         value={rejectMessage || ''}
         onChange={(e) => setRejectMessage(e.target.value)}
         ></Input>
      </Modal>
    </div>
  );
};
export default LeaveApproveForm;
