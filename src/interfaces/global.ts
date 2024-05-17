export interface ModalProps {
  open: boolean;
  handleClose: () => void;
  item?: any
}

interface Header {
  title: string;
  value: string;
}

interface BodyItem {
  id: string;
  [key: string]: any;
}

export interface TableProps {
  headers: Header[];
  body: BodyItem[];
  isLoading: boolean;
  deleteItem: (id: string)=> void,
  editItem: (item: any)=> void,
}
export interface PaginationProps {
  totalCount: number,
  page: number,
  setParams: (value:number)=> void
}
