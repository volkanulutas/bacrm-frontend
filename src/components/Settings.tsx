import React, { useContext, useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import type { FormInstance } from "antd/es/form";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  task: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
  day6: string;
  day7: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  task: string;
  day1: number;
  day2: number;
  day3: number;
  day4: number;
  day5: number;
  day6: number;
  day7: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

const Settings: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      task: "task1",
      day1: 9.0,
      day2: 9.0,
      day3: 9.0,
      day4: 9.0,
      day5: 9.0,
      day6: 9.0,
      day7: 9.0,
    },
    {
      key: "1",
      task: "task2",
      day1: 9.0,
      day2: 9.0,
      day3: 9.0,
      day4: 9.0,
      day5: 9.0,
      day6: 9.0,
      day7: 9.0,
    },
    {
      key: "2",
      task: "task3",
      day1: 9.0,
      day2: 9.0,
      day3: 9.0,
      day4: 9.0,
      day5: 9.0,
      day6: 9.0,
      day7: 9.0,
    },
  ]);

  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  let days: string[] = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "task",
      dataIndex: "task",
      width: "30%",
      editable: true,
    },
    {
      title: days[0],
      dataIndex: "day1",
      width: "30%",
      editable: true,
    },
    {
      title: days[1],
      dataIndex: "day2",
      editable: true,
    },
    {
      title: days[2],
      dataIndex: "day3",
      editable: true,
    },
    {
      title: days[3],
      dataIndex: "day4",
      editable: true,
    },
    {
      title: days[4],
      dataIndex: "day5",
      editable: true,
    },
    {
      title: days[5],
      dataIndex: "day6",
      editable: true,
    },
    {
      title: days[6],
      dataIndex: "day7",
      editable: true,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      task: `Task ${count}`,
      day1: 9.0,
      day2: 9.0,
      day3: 9.0,
      day4: 9.0,
      day5: 9.0,
      day6: 9.0,
      day7: 9.0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default Settings;
