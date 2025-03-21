import { Pack } from '../entities/Pack';

const dataPackList: Pack[] = [
  {
    ID: 'pa01',
    name: 'Cơ bản',
    price: 50000,
    description: ['Một thiết bị', 'Độ phân giải HD', 'Đáp ứng cho cơ bản'],
  },
  {
    ID: 'packpa02',
    name: 'Tiêu chuẩn',
    price: 75000,
    description: [
      'Hai thiết bị',
      'Độ phân giải full HD',
      'Xem ở mức tiêu chuẩn',
    ],
  },
  {
    ID: 'pa03',
    name: 'Cao cấp',
    price: 80000,
    description: ['Năm thiết bị', 'Độ phân giải 4K', 'Giải trí không giới hạn'],
  },
];

export default dataPackList;
