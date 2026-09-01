// Bộ thiệp tranh vẽ tay thật, dùng quanh năm (không giới hạn dịp Trung Thu) — Đợt 1:
// 15 tranh thật do Nguyên Khánh (con gái nhà sáng lập) vẽ.
// Đây KHÔNG phải minh hoạ AI hay ảnh mua — là tranh gốc, chỉ Chọn Quà Chuẩn có.
//
// Đã CỐ Ý loại bỏ tranh có nhân vật thuộc bản quyền người khác (vd: Pikachu/Pokémon)
// dù bé vẽ tay — nhân vật vẫn thuộc sở hữu trí tuệ của Nintendo, không an toàn để
// dùng trên sản phẩm thương mại. Chỉ giữ tranh nhân vật/khung cảnh do bé tự nghĩ ra.
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
    defaultMessage: "Chúc mọi điều ước của bạn lấp lánh như trời sao đêm nay.",
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
    defaultMessage: "Chúc bạn và những người thân yêu luôn quây quần, gắn bó bên nhau.",
  },
  {
    id: "ma",
    name: "Bạn Ma Dễ Thương",
    image: "/trung-thu/ma.jpg",
    defaultMessage: "Chúc bạn những ngày vui nhộn, đầy những bất ngờ thú vị.",
  },
  {
    id: "ca-koi",
    name: "Cá Koi May Mắn",
    image: "/trung-thu/ca-koi.jpg",
    defaultMessage: "Chúc bạn luôn an lành, mọi điều hanh thông như cá gặp nước.",
  },
  {
    id: "hoa-anh-dao",
    name: "Hoa Anh Đào Đêm",
    image: "/trung-thu/hoa-anh-dao.jpg",
    defaultMessage: "Chúc cuộc sống của bạn luôn nở rộ những điều tốt đẹp, như sắc hoa dưới trăng rằm.",
  },
  {
    id: "qua-bo",
    name: "Quả Bơ Tươi Mới",
    image: "/trung-thu/qua-bo.jpg",
    defaultMessage: "Chúc bạn luôn tươi mới, tràn đầy năng lượng mỗi ngày.",
  },
  {
    id: "cuu-cham-bi",
    name: "Cừu Chấm Bi",
    image: "/trung-thu/cuu-cham-bi.jpg",
    defaultMessage: "Chúc bạn những ngày nhẹ nhàng, đáng yêu như tuổi thơ.",
  },
  {
    id: "binh-hoa",
    name: "Bình Hoa Nhỏ",
    image: "/trung-thu/binh-hoa.jpg",
    defaultMessage: "Cảm ơn vì đã luôn ở đó — chúc bạn một mùa trăng rằm thật đẹp.",
  },
  {
    id: "banh-sinh-nhat",
    name: "Bánh & Nến Ước Mơ",
    image: "/trung-thu/banh-sinh-nhat.jpg",
    defaultMessage: "Chúc mọi điều ước của bạn dưới ánh trăng rằm đều thành hiện thực.",
  },
  {
    id: "chu-tuyet",
    name: "Chú Tuyết & Bạn Nhỏ",
    image: "/trung-thu/chu-tuyet.jpg",
    defaultMessage: "Chúc gia đình bạn một mùa đoàn viên thật ấm áp, dù muôn nơi vẫn chung một vầng trăng.",
  },
  {
    id: "quoc-khanh",
    name: "Diễu Hành Mừng Quốc Khánh",
    image: "/trung-thu/quoc-khanh.jpg",
    defaultMessage: "Thật tự hào ngày Quốc Khánh 2/9, chúc bạn và gia đình một ngày nghỉ lễ ý nghĩa và nhiều niềm vui.",
  },
  {
    id: "nui-suoi",
    name: "Suối Nguồn Bình Yên",
    image: "/trung-thu/nui-suoi.jpg",
    defaultMessage: "Chúc bạn luôn bình yên và an nhiên, như dòng suối nhỏ giữa núi rừng.",
  },
  {
    id: "ky-lan-cau-vong",
    name: "Kỳ Lân Cầu Vồng",
    image: "/trung-thu/ky-lan-cau-vong.jpg",
    defaultMessage: "Chúc cuộc sống của bạn luôn rực rỡ sắc màu như cầu vồng sau mưa.",
  },
];

export function findCard(id: string | undefined): TrungThuCard {
  return TRUNG_THU_CARDS.find((c) => c.id === id) ?? TRUNG_THU_CARDS[0];
}
