import React, { useRef, useState } from "react";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Button, Form, Input, Popconfirm, Table, Space } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {CheckCircleOutlined,CloseCircleOutlined,QuestionCircleOutlined} from'@ant-design/icons';
import Highlighter from 'react-highlight-words';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';

interface DataType {
    id: React.Key;
    name: string;
    definition: string;
    status: string;
    planningDate: number,
    startDate: number,
    endDate: number,
  }

  type DataIndex = keyof DataType;

  const data: DataType[] = [
    {
      id: "1",
      name: "Render Alınması",
      definition: "İş açıklaması",
      status: "STATUS",
      planningDate: 1694979873986,
      startDate: 1694979873986,
      endDate: 1694979873986,
    }
  ];
  
 
  export const getFullDate = (dateNum: number): string => {
    let date = new Date(dateNum);
    return date.toDateString();
  };


const WorkListForm = () => {
    const navigation = useNavigate();
    const columns: ColumnsType<DataType> = [
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
            sorter: (a,b) => a.name.localeCompare(b.name),
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: "Açıklama",
            dataIndex: "definition",
            filterSearch: true,
            width: "25%",
            // TODO:    ...getColumnSearchProps('definition'),
            sorter: (a,b) => a.definition.localeCompare(b.definition),
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: "Durumu",
            dataIndex: "status",
            filterSearch: true,
            width: "10%",
            // TODO:    ...getColumnSearchProps('status'),
            sorter: (a,b) => a.status.localeCompare(b.status),
            sortDirections: ['descend', 'ascend'],
          },
          {
            title: "Planlama Zamanı",
            dataIndex: "planningDate",
            filterSearch: true,
            // TODO:    ...getColumnSearchProps('planningDate'),
            render:((date:number) => getFullDate(date)),
            sorter: (a,b) => a.planningDate-b.planningDate,
            width: "15%",
          },
          {
            title: "Başlama Zamanı",
            dataIndex: "startDate",
            render:((date:number) => getFullDate(date)),
            // TODO:    ...getColumnSearchProps('startDate'),
            sorter: (a,b) => a.startDate-b.startDate,
            filterSearch: true,
            width: "15%",
          },
          {
            title: "Bitiş Zamanı",
            dataIndex: "endDate",
            render:((date:number) => getFullDate(date)),
            sorter: (a,b) => a.endDate-b.endDate,
            // TODO:    ...getColumnSearchProps('endDate'),
            filterSearch: true,
            width: "15%",
          },
          {
            title: 'İşlemler',
            dataIndex: 'action',
            render: (_, record: { id: React.Key }) =>
              data.length >= 1 ? (
                <div>
                  <Button type="primary" shape="circle" onClick={navigateTo} icon={<QuestionCircleOutlined/>}></Button>
                </div>
              ) : null,
          },
      ]

    const onChange: TableProps<DataType>["onChange"] = (
        pagination,
        filters,
        sorter,
        extra
      ) => {
        console.log("params", pagination, filters, sorter, extra);
      };
 
      const navigateTo = () => {
        navigation("/work-detail");
      };
  

      // TODO: table filter, sorter ekle
  return (
    <div>
      <h2>İş Listesi</h2>
         <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};
export default WorkListForm;
