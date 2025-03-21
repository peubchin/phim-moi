import { News } from '../entities/News';

const dataNewsList: News[] = [
  {
    ID: 'ne01',
    title: 'Ưu Đãi Xa Xỉ',
    content:
      'Còn chần chờ gì mà không tới ngay Moi Cinema để khám phá hành trình “đổi đời" đầy kịch tính của gia đình ông Hòa - bà Mạt, cùng hàng loạt ưu đãi cực sốc lên tới 30% khi mua combo quà tặng bắp Pepsi, Kitkat từ ngày 18.10.2024. Còn chần chờ gì mà không tới ngay Moi Cinema để khám phá hành trình “đổi đời" đầy kịch tính của gia đình ông Hòa - bà Mạt, cùng hàng loạt ưu đãi cực sốc lên tới 30% khi mua combo quà tặng bắp Pepsi, Kitkat từ ngày 18.10.2024. ',
    imgURL: 'assets/img/news/news1.jpg',
    date: '2024-08-02',
    view: 10848,
    rateList: [
      {
        username: 'user01',
        like: true,
      },
    ],
  },
  {
    ID: 'ne02',
    title: 'Voucher ShopeePay',
    content:
      'Thông tin tài khoản Ví ShopeePay (Họ tên, số điện thoại) phải trùng khớp với thông tin đăng ký tài khoản ngân hàng liên kết. Trong trường hợp nghi ngờ gian lận, ShopeePay có quyền yêu cầu khách hàng cung cấp thông tin Chứng minh Nhân dân/ Căn. Thông tin tài khoản Ví ShopeePay (Họ tên, số điện thoại) phải trùng khớp với thông tin đăng ký tài khoản ngân hàng liên kết. Trong trường hợp nghi ngờ gian lận, ShopeePay có quyền yêu cầu khách hàng cung cấp thông tin Chứng minh Nhân dân/ Căn.',
    imgURL: 'assets/img/news/news2.jpg',
    date: '2024-06-12',
    view: 24972,
    rateList: [],
  },
  {
    ID: 'ne03',
    title: 'Happy Day',
    content:
      'Ưu đãi 55.000đ/gói Tiêu chuẩn áp dụng tại khu vực: Moi Tân Bình, Moi Nguyễn Du, Moi Kinh Dương Vương, Moi Trung Chánh, Moi Huỳnh Tấn Phát, Moi Nguyễn Văn Quá, Moi Trường Chinh, Moi Mipec Long Biên, Moi Bến Tre. Ưu đãi 55.000đ/gói Tiêu chuẩn áp dụng tại khu vực: Moi Tân Bình, Moi Nguyễn Du, Moi Kinh Dương Vương, Moi Trung Chánh, Moi Huỳnh Tấn Phát, Moi Nguyễn Văn Quá, Moi Trường Chinh, Moi Mipec Long Biên, Moi Bến Tre.',
    imgURL: 'assets/img/news/news3.jpg',
    date: '2024-02-18',
    view: 12989,
    rateList: [],
  },
  {
    ID: 'ne04',
    title: 'Moi Be',
    content:
      'Be x Galaxy Cinema tặng Quý khách ưu đãi lên đến 25% (Tối đa 50.000đ) cho beBike/beCar/beCar Plus/beBike Plus. Nhập mã "GALAXYQ8". Ưu đãi chỉ áp dụng cho phương thức thanh toán là Tiền mặt, Thẻ. Be x Galaxy Cinema tặng Quý khách ưu đãi lên đến 25% (Tối đa 50.000đ) cho beBike/beCar/beCar Plus/beBike Plus. Nhập mã "GALAXYQ8". Ưu đãi chỉ áp dụng cho phương thức thanh toán là Tiền mặt, Thẻ.',

    imgURL: 'assets/img/news/news4.jpg',
    date: '2024-04-23',
    view: 25093,
    rateList: [],
  },
  {
    ID: 'ne05',
    title: 'Moi VNPAY',
    content:
      'Nhập mã VNPAYGALAXY để được giảm tới 10K khi thanh toán bằng VNPAY-QR. Giảm 5K cho mọi hóa đơn. Giảm 10K cho đơn hàng từ 250K. Mỗi khách hàng được nhập mã khuyến mãi 1 lần/tháng. NPAY có quyền quyết định cuối cùng trong việc xét duyệt các giao dịch và số điện thoại hợp lệ để tăng mã. Nhập mã VNPAYGALAXY để được giảm tới 10K khi thanh toán bằng VNPAY-QR. Giảm 5K cho mọi hóa đơn. Giảm 10K cho đơn hàng từ 250K. Mỗi khách hàng được nhập mã khuyến mãi 1 lần/tháng. NPAY có quyền quyết định cuối cùng trong việc xét duyệt các giao dịch và số điện thoại hợp lệ để tăng mã.',
    imgURL: 'assets/img/news/news5.jpg',
    date: '2024-01-20',
    view: 18983,
    rateList: [],
  },
  {
    ID: 'ne06',
    title: 'Moi Mưa Quà Tặng',
    content:
      'Khách hàng thành viên tích lũy điểm dựa trên giá trị chi tiêu tại Phim Moi. Điểm tích lũy được gọi là Star. 1 điểm đổi được 1.000 đồng – áp dụng được cho việc thanh toán gói. Điểm tích lũy sẽ được cộng vào tài khoản vào ngay sau khi giao dịch. Khách hàng thành viên tích lũy điểm dựa trên giá trị chi tiêu tại Phim Moi. Điểm tích lũy được gọi là Star. 1 điểm đổi được 1.000 đồng – áp dụng được cho việc thanh toán gói. Điểm tích lũy sẽ được cộng vào tài khoản vào ngay sau khi giao dịch.',
    imgURL: 'assets/img/news/news6.jpg',
    date: '2024-03-26',
    view: 13750,
    rateList: [],
  },
  {
    ID: 'ne07',
    title: 'Gói Siêu Hạt Dẻ',
    content:
      'Mùa bom tấn tới rồi, ghé Phim Moi tận hưởng phim hay và nhận nhiều ưu đãi cùng quà tặng nào các Stars U22 ơi! Phim Moi dành tặng các Stars từ 22 tuổi trở xuống một phần quà ưu khủng. Dành cho khách hàng thành viên U22 (độ tuổi 13-22) Mùa bom tấn tới rồi, ghé Phim Moi tận hưởng phim hay và nhận nhiều ưu đãi cùng quà tặng nào các Stars U22 ơi! Phim Moi dành tặng các Stars từ 22 tuổi trở xuống một phần quà ưu khủng. Dành cho khách hàng thành viên U22 (độ tuổi 13-22)',
    imgURL: 'assets/img/news/news7.jpg',
    date: '2024-05-11',
    view: 24735,
    rateList: [],
  },
  {
    ID: 'ne08',
    title: 'Bánh Phồng Ngất Ngây',
    content:
      'Xem phim nhâm nhi bắp rang từ lâu đã là một trải nghiệm quá quen thuộc, nếu vẫn còn phân vân giữa các vị bắp khác nhau thì Phim Moi mời Stars “đổi gió” với snack Rec Rec ngon mà không nhàm chán! Bánh Phồng Dế Rec Rec mang nhiều hương vị đa dạng để Stars có cơ hội thưởng thức trọn vị thơm ngon đậm đà Xem phim nhâm nhi bắp rang từ lâu đã là một trải nghiệm quá quen thuộc, nếu vẫn còn phân vân giữa các vị bắp khác nhau thì Phim Moi mời Stars “đổi gió” với snack Rec Rec ngon mà không nhàm chán! Bánh Phồng Dế Rec Rec mang nhiều hương vị đa dạng để Stars có cơ hội thưởng thức trọn vị thơm ngon đậm đà',
    imgURL: 'assets/img/news/news8.jpg',
    date: '2024-07-22',
    view: 12656,
    rateList: [],
  },
];

export default dataNewsList;
