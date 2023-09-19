import React, { useRef, useState } from "react";
import {Divider,Table,Space,Button,Popconfirm, Input,Modal } from 'antd';

import {CheckCircleOutlined,CloseCircleOutlined,QuestionCircleOutlined} from'@ant-design/icons';

import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';

import Highlighter from 'react-highlight-words';
import type { InputRef } from 'antd';

import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { text } from "stream/consumers";

interface DataType {
  key: string;
 employeeName:string;
 title: string;
 department: string;
 eMail:string;
 telephoneNumber: string;
 employmentDate:number;
  
  
  
  
}
type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    key: '1',
    employeeName: 'Derya Taş',
    title:'diyetisyen',
    department: 'ik',
    eMail:'dryts',
    telephoneNumber:'0545',
    employmentDate:1694979873986,
  },
  {
    key: '2',
    employeeName: 'Volkan Ulutaş',
    title:'Software',
    department: 'Yönetim',
    eMail:'volk',
    telephoneNumber:'0545',
    employmentDate:1695145889625,
  },

  
];
export const getFullDate = (dateNum: number): string => {
  let date = new Date(dateNum);
  return date.toDateString();
};
const EmployeeForm = () => {
  const navigation = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigateTo = () => {
    navigation("/employee-edit-form");
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

      sorter: (a,b) => a.employeeName.localeCompare(b.employeeName),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ünvanı',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
     
      sorter: (a,b) => a.title.localeCompare(b.title),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Departman',
      dataIndex: 'department',
      key: 'department',
      ...getColumnSearchProps('department'),
     
      sorter: (a,b) => a.department.localeCompare(b.department),
      sortDirections: ['descend', 'ascend'],
    },


    {
      title: 'E posta',
      dataIndex: 'eMail',
      key: 'eMail',
      ...getColumnSearchProps('eMail'),
     
    },
    {
      title: 'Telefon',
      dataIndex: 'telephoneNumber',
      key: 'telephoneNumber',
      ...getColumnSearchProps('telephoneNumber'),
    
     
    },
    {
      title: 'İşe Giriş Tarihi',
      dataIndex: 'employmentDate',
      key: 'employmentDate',
      ...getColumnSearchProps('employmentDate'),//TODO: number a göre arıyor rander et
      render:((date:number) => getFullDate(date)),
      sorter: (a,b) => a.employmentDate-b.employmentDate,
      sortDirections: ['descend', 'ascend'],
    },

    {
      title: 'İşlem',
      dataIndex: 'action',
      render: (_, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <div>
             

 
 <Button type="primary" shape="circle" onClick={navigateTo} icon={<QuestionCircleOutlined/>}></Button>



          </div>
         
        ) : null,
    },
   
  ];









  return (
    <div>
      <h2>Çalışanlar</h2>

<Table columns={columns} dataSource={data} />

      
   
    </div>
  );
};
export default EmployeeForm;
