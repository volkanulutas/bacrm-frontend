import React, { useState, useEffect,useRef } from "react";
import type { ColumnsType, TableProps, ColumnType } from "antd/es/table";
import { Button, Table, Space, Modal, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";

import { getAll, deleteWork } from "../../service/work.service";

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

const WorkListForm = () => {
  const navigation = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
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
  ): ColumnType<Work> => ({
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

  const deleteConfirm = (id: number) => {
    modal.confirm({
      title: "Silme Onayı",
      icon: <CloseCircleOutlined />,
      content: "Silmek İstediğinize Emin Misiniz?",
      okText: "Sil",
      cancelText: "Vazgeç",
      onOk: () => {
        removeWork(id);
      },
    });
  };
  const removeWork = async (id: number) => {
    await deleteWork(id).then((res) => {
      setLoading(false);
      window.location.reload();
    });
  };
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
      render: (text, record) => {
        return record.workloadHour + " saat";
      },
      ...getColumnSearchProps('workloadHour'),
      sorter: (a, b) => a.workloadHour - b.workloadHour,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Planlama Zamanı",
      dataIndex: "planningDate",
      filterSearch: true,
      ...getColumnSearchProps('planningDate'),
      render: (date: number) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
      sorter: (a, b) => a.planningDate - b.planningDate,
      width: "15%",
    },
    {
      title: "Başlama Zamanı",
      dataIndex: "startDate",
      render: (date: number) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
     
      ...getColumnSearchProps('startDate'),
      sorter: (a, b) => a.startDate - b.startDate,
      filterSearch: true,
      width: "15%",
    },
    {
      title: "Bitiş Zamanı",
      dataIndex: "endDate",
      render: (date: number) => moment(date).format("DD/MM/YYYY HH:mm:ss"),
     
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
      <Space direction="vertical">
        <h2>İş Listesi</h2>
        <Button type="primary" onClick={() => navigateTo(-1)}>
          Yeni İş Ekle
        </Button>
      </Space>
      <Table columns={columns} dataSource={dataSource} onChange={onChange} />
    </div>
  );
};
export default WorkListForm;
