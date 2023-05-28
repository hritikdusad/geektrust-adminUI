//package import
import { Button, Col, Form, Input, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

// common imports
import Header from "../../components/Header/Header";

// screen level imports
import useAdminUiHook from "./hooks/useAdminUiHook";
import EditableCell from "./customComponent/EditableCell";
import dataHelper from "./hooks/dataHelper";
import { IGridData } from "./type";

const AdminUI = () => {
  const {
    state,
    loading,
    editingKey,
    selectedRowKeys,
    rowSelection,
    form,
    handleRowDelete,
    handleSearch,
    onPageChange,
    handleSelectedDeletion,
    handleRowEditCancel,
    handleRowEdit,
    handleRowEditSave,
  } = useAdminUiHook();

  const { isEditing } = dataHelper;

  const columnsDefination: ColumnsType<IGridData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "1",
      onCell: (record: IGridData) => ({
        record,
        inputType: "text",
        dataIndex: "name",
        title: "name",
        editing: isEditing(record, editingKey),
      }),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
      onCell: (record: IGridData) => ({
        record,
        inputType: "text",
        dataIndex: "email",
        title: "email",
        editing: isEditing(record, editingKey),
      }),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "3",
      onCell: (record: IGridData) => ({
        record,
        inputType: "text",
        dataIndex: "role",
        title: "role",
        editing: isEditing(record, editingKey),
      }),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "4",
      render: (value: any, record: IGridData) => {
        const isEditable = isEditing(record, editingKey);

        return isEditable ? (
          <Row gutter={[9, 9]}>
            <Col>
              <Button onClick={() => handleRowEditSave(record)}>Save</Button>
            </Col>
            <Col>
              <Button onClick={handleRowEditCancel}>Cancel</Button>
            </Col>
          </Row>
        ) : (
          <Row gutter={[9, 9]}>
            <Col>
              <EditOutlined onClick={() => handleRowEdit(record)} />
            </Col>
            <Col>
              <DeleteOutlined
                style={{ color: "red" }}
                onClick={() => handleRowDelete(record)}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <Row gutter={[6, 6]} align="middle" justify="center" className="mt-2">
        <Col xs={22}>
          <Input
            size="large"
            placeholder="Serach By Name, Email or Role"
            onChange={handleSearch}
          />
        </Col>
      </Row>
      <Row gutter={[6, 6]} align="middle" justify="center" className="mt-2">
        <Col xs={22}>
          <Form form={form} component={false}>
            <Table
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              columns={columnsDefination}
              dataSource={state?.filteredData}
              loading={loading}
              pagination={{
                pageSize: 10,
                onChange: onPageChange,
              }}
              bordered={true}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
            />
          </Form>
        </Col>
      </Row>
      <Row gutter={[6, 6]} justify="start">
        <Col xs={1}></Col>
        <Col>
          <Button
            type="primary"
            danger
            onClick={handleSelectedDeletion}
            disabled={selectedRowKeys === undefined}
          >
            Delete Selected
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default AdminUI;
