//package imports
import { Key, useEffect, useState } from "react";
import { Form } from "antd";

// screen imports
import { IAdminUiState, IGridData } from "../type";
import dataHelper from "./dataHelper";

const useAdminUiHook = () => {
  // constant declarations
  const { getPageSize, getMembersData, getNewState } = dataHelper;
  const [form] = Form.useForm();

  // state initializations
  const [state, setState] = useState<IAdminUiState>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[] | undefined>(
    undefined
  );
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const rowSelection = {
    onChange: (selectedRowKeys: Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    onSelectAll: (selected: boolean) => {
      if (selected) {
        const keys = [] as number[];
        for (
          let i = getPageSize() * (pageNumber - 1);
          i < pageNumber * getPageSize();
          i++
        ) {
          keys.push(i);
        }
        setSelectedRowKeys(keys);
      } else {
        setSelectedRowKeys(undefined);
      }
    },
    selectedRowKeys: selectedRowKeys,
    getCheckboxProps: (record: IGridData) => ({
      name: record.name,
    }),
  };

  // useEffects
  useEffect(() => {
    (async () => {
      setLoading(true);
      const membersData: IGridData[] | undefined = await getMembersData();
      if (membersData !== undefined) {
        const newState: IAdminUiState = {
          rowData: membersData,
          filteredData: membersData,
        };
        setState(newState);
      }
      setLoading(false);
    })();
  }, []);

  // Event handlers

  const handleSearch = (event: any) => {
    if (state !== undefined && state.rowData !== undefined) {
      const valueToBeSearched: string = event.target.value;
      if (valueToBeSearched) {
        const updatedData = state.rowData.filter((item: IGridData) => {
          if (
            item.email
              .toLowerCase()
              .includes(valueToBeSearched.toLowerCase()) ||
            item.name.toLowerCase().includes(valueToBeSearched.toLowerCase()) ||
            item.role.toLowerCase().includes(valueToBeSearched.toLowerCase())
          ) {
            return true;
          } else {
            return false;
          }
        });

        setState(getNewState(state.rowData, updatedData));
      } else {
        setState(getNewState(state.rowData, state.rowData));
      }
    }
  };

  // grid event handlers

  const handleRowEdit = (record: Partial<IGridData> & { key: React.Key }) => {
    form.setFieldsValue({
      name: record.name,
      role: record.role,
      email: record.email,
      ...record,
    });
    setEditingKey(record.id!);
  };

  const handleRowEditCancel = () => {
    setEditingKey("");
  };

  const handleRowDelete = (record: IGridData) => {
    try {
      if (state !== undefined && state.filteredData !== undefined) {
        const clonedData = [...state?.filteredData];
        const remainingRecords = clonedData.filter(
          (item: IGridData) => item.id !== record.id
        );
        setState(getNewState(state.rowData, remainingRecords));
      }
    } catch (Ex: any) {
      console.log(`Exception occured while deletion: ${Ex}`);
    }
  };

  const handleRowEditSave = (record: IGridData) => {
    if (state !== undefined && state.filteredData !== undefined) {
      const data = [...state?.filteredData];
      data.forEach((item: IGridData) => {
        if (item.id === record.id) {
          item.email = form.getFieldValue("email");
          item.name = form.getFieldValue("name");
          item.role = form.getFieldValue("role");
        }
      });

      setState(getNewState(state.rowData, data));
      setEditingKey("");
    }
  };

  const onPageChange = (page: number, pageSize: number) => {
    setPageNumber(page);
    setSelectedRowKeys(undefined);
    setEditingKey("");
  };

  const handleSelectedDeletion = () => {
    try {
      if (state !== undefined && state.filteredData !== undefined) {
        const clonedData = [...state?.filteredData];

        const remainingRecords = clonedData.filter((item: IGridData) =>
          selectedRowKeys?.includes(item.key)
        );

        setState(getNewState(state.rowData, remainingRecords));
      }
    } catch (Ex: any) {
      console.log(`Exception occured while selected deletion: ${Ex}`);
    }
  };

  return {
    loading,
    rowSelection,
    state,
    selectedRowKeys,
    handleRowDelete,
    handleSearch,
    onPageChange,
    handleSelectedDeletion,
    form,
    editingKey,
    handleRowEditCancel,
    handleRowEdit,
    handleRowEditSave,
  };
};

export default useAdminUiHook;
