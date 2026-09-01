// Bộ thiệp Trung Thu 2026 — Đợt 1: 7 tranh thật do Nguyên Khánh (con gái nhà sáng lập) vẽ.
// Đây KHÔNG phải minh hoạ AI hay ảnh mua — là tranh gốc, chỉ Chọn Quà Chuẩn có.
//
// Thêm/bớt thiệp: thêm ảnh vào public/trung-thu/, thêm 1 dòng vào mảng dưới đây.
export type TrungThuCard = {
  id: string;
  name: string;
  image: string; // đường dẫn trong /public
  defaultMessage: string;
};

export const TRUNG_THU_CARDS: TrungThuCard[] = [
  {
    id: "co-tien",
    name: "Cô Tiên Đêm Sao",
    image: "/trung-thu/co-tien.jpg",
    defaultMessage: "Chúc Trung Thu này, mọi điều ước của bạn lấp lánh như trời sao đêm nay.",
  },
  {
    id: "trang-sao",
    name: "Trăng Và Sao",
    image: "/trung-thu/trang-sao.jpg",
    defaultMessage: "Trăng tròn, lòng người cũng tròn — chúc bạn một mùa Trung Thu đoàn viên ấm áp.",
  },
  {
    id: "nha-nam-tho",
    name: "Nhà Nấm & Thỏ Con",
    image: "/trung-thu/nha-nam-tho.jpg",
    defaultMessage: "Chúc gia đình bạn luôn quây quần, ấm áp như câu chuyện cổ tích dưới trăng.",
  },
  {
    id: "cu-meo",
    name: "Cú Mèo Đêm Trăng",
    image: "/trung-thu/cu-meo.jpg",
    defaultMessage: "Chúc bạn một đêm trăng thật tĩnh lặng và bình yên bên người thương.",
  },
  {
    id: "dan-meo",
    name: "Đàn Mèo Quây Quần",
    image: "/trung-thu/dan-meo.jpg",
    defaultMessage: "Trung Thu là dịp để quây quần — chúc bạn và những người thân yêu luôn bên nhau.",
  },
  {
    id: "ky-lan",
    name: "Kỳ Lân & Cầu Vồng",
    image: "/trung-thu/ky-lan.jpg",
    defaultMessage: "Chúc các bé một mùa Trung Thu rực rỡ, đầy ắp tiếng cười và niềm vui.",
  },
  {
    id: "cau-vong",
    name: "Cầu Vồng Sau Mưa",
    image: "/trung-thu/cau-vong.jpg",
    defaultMessage: "Sau những ngày bận rộn, chúc bạn có một mùa trăng rằm thật trọn vẹn.",
  },
];

export function findCard(id: string | undefined): TrungThuCard {
  return TRUNG_THU_CARDS.find((c) => c.id === id) ?? TRUNG_THU_CARDS[0];
}
