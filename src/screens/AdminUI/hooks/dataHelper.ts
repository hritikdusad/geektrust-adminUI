// package imports
import axios from "axios";

//common imports
import UrlStore from "../../../assets/UrlStore";

// folder imports
import pageSize from "../enum";
import { IAdminUiState, IGridData, IMemberData } from "../type";

const getNewState = (rowData: IGridData[], filteredData: IGridData[]) =>
  ({
    rowData: rowData,
    filteredData: filteredData,
  } as IAdminUiState);

const isEditing = (record: IGridData, editingKey: string) =>
  record.id === editingKey;

const getPageSize = () => pageSize.TEN;

const getMembersData = async () => {
  try {
    const response = await axios.get(UrlStore.MembersDataUrl.GetMembersData);
    const membersData: IMemberData[] = response.data;
    const result: IGridData[] = membersData.map(
      (item: IMemberData, index: number) =>
        ({ ...item, key: index } as IGridData)
    );
    return result;
  } catch (ex: any) {
    console.log(ex);
  }
};

const dataHelper = {
  getNewState,
  isEditing,
  getPageSize,
  getMembersData,
};

export default dataHelper;
