import React, { useRef, useState } from "react";
import {Divider,Table,Space,Button,Popconfirm, Input,Modal } from 'antd';

import {CheckCircleOutlined,CloseCircleOutlined} from'@ant-design/icons';


import { SearchOutlined } from '@ant-design/icons';

import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';

import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { text } from "stream/consumers";


interface DataType {
  key: string;
  employeeName: string;
  leaveType: string;
  leaveStartDate:number;
  leaveEndDate:number;
  workStartDate:number;
  
}
type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: '1',
    employeeName: 'Derya Taş',
    leaveType:'Yıllık izin', 
    leaveStartDate:1694979873986,
    leaveEndDate: 16949798738986,
    workStartDate:1694979873956,
    
  },
  {
    key: '2',
    employeeName: 'Volkan Ulutaş',
    leaveType: 'Mazeret izni',
    leaveStartDate:1594979873986,
    leaveEndDate: 1594979873986,
    workStartDate:1594979873986,
  },
  
];

export const getFullDate = (dateNum: number): string => {
  let date = new Date(dateNum);
  return date.toDateString();
};


const LeaveApproveForm = () => {
  
	
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
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
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Çalışan Adı',
      dataIndex: 'employeeName',
      key: 'employeeName',
      width: '30%',
      ...getColumnSearchProps('employeeName'),
    },
    {
      title: 'İzin Tipi',
      dataIndex: 'leaveType',
      key: 'leaveType',
      width: '20%',
      ...getColumnSearchProps('leaveType'),
    },
    {
      title: 'Başlangıç Tarihi',
      dataIndex: 'leaveStartDate',
      key: 'leaveStartDate',
      ...getColumnSearchProps('leaveStartDate'),
      render:((date:number) => getFullDate(date)),
      sorter: (a,b) => a.leaveStartDate-b.leaveStartDate,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Bitiş Tarihi',
      dataIndex: 'leaveEndDate',
      key: 'leaveEndDate',
      ...getColumnSearchProps('leaveEndDate'),
      render:((date:number) => getFullDate(date)),
      sorter: (a,b) => a.leaveEndDate-b.leaveEndDate,
      
      sortDirections: ['descend', 'ascend'],
    },

    
  
    {
      title: 'İşe Başlama Tarihi',
      dataIndex: 'workStartDate',
      key: 'workStartDate',
      ...getColumnSearchProps('workStartDate'),
      render:((date:number) => getFullDate(date)),
      sorter: (a,b) => a.workStartDate-b.workStartDate,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'İşlem',
      dataIndex: 'action',
      render: (_, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <div>
             

 <Button type="primary"  className="marginright" shape="circle" icon={< CheckCircleOutlined/>}></Button>
 <Button type="primary" danger shape="circle" onClick={showModal} icon={< CloseCircleOutlined/>}></Button>



          </div>
         
        ) : null,
    },
  ];

	return (
    <div>
        <h2>İzin Onay Formu</h2>

        <Divider orientation="center">İzin Talepleri
      </Divider>
      <Table columns={columns} dataSource={data} />
     
      <Modal title="Red Nedeni" cancelButtonProps={{ style: { display: 'none' } }}  okText="Reddet"   open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input></Input>
        
      </Modal>
    
    </div>
    
    
  );
}
export default LeaveApproveForm;










