import { dateToString } from '../utility';

export interface Bill {
  packID: string;
  paidDate: string;
  canceledDate: string;
  monthQuantity: number;
}

export function createBill(packID: string, monthQuantity: number) {
  const bill = {
    packID,
    paidDate: dateToString(new Date()),
    monthQuantity,
    canceledDate: '',
  };
  return bill;
}
