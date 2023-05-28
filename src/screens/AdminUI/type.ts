export interface IMemberData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IGridData extends IMemberData {
  key: number;
}

export interface IAdminUiState {
  rowData: IGridData[];
  filteredData: IGridData[];
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: IGridData;
  index: number;
  children: React.ReactNode;
}
