import Image from "next/image";
import Link from "next/link";
import React from "react";

// types/site.ts
export type BranchType = {
  id: string;
  name: string;
  address: string;
  phone?: string;
};

export type SiteInfoType = {
  companyName: string;
  info: string;
  hotline: string;
  email: string;
  branches: BranchType[];
};

// types/page.ts
export type PageType = "POLICY" | "SUPPORT";
export type FooterPageItemType = {
  id: string;
  title: string;
  slug: string;
  type: PageType;
};

export type FooterDataType = {
  siteInfo: SiteInfoType;
  policies: FooterPageItemType[];
  supports: FooterPageItemType[];
};
export const siteInfoMock: SiteInfoType = {
  companyName: "CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ YẾN SÀO THỦ ĐỨC",
  info: "Giấy chứng nhận đăng ký kinh doanh số 0109752738 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày 23 tháng 09 năm 2021.",
  hotline: "1900 1234",
  email: "support@abcfurniture.vn",
  branches: [
    {
      id: "hcm-1",
      name: "Showroom Quận 1",
      address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "028 1234 5678",
    },
    {
      id: "hcm-2",
      name: "Showroom Quận 7",
      address: "456 Nguyễn Thị Thập, Quận 7, TP.HCM",
    },
  ],
};
export const footerPagesMock: FooterPageItemType[] = [
  {
    id: "policy-privacy",
    title: "Chính sách bảo mật",
    slug: "chinh-sach-bao-mat",
    type: "POLICY",
  },
  {
    id: "policy-return",
    title: "Chính sách đổi trả",
    slug: "chinh-sach-doi-tra",
    type: "POLICY",
  },
  {
    id: "policy-warranty",
    title: "Chính sách bảo hành",
    slug: "chinh-sach-bao-hanh",
    type: "POLICY",
  },
  {
    id: "support-payment",
    title: "Hướng dẫn thanh toán",
    slug: "huong-dan-thanh-toan",
    type: "SUPPORT",
  },
  {
    id: "support-shipping",
    title: "Vận chuyển & kiểm hàng",
    slug: "van-chuyen-kiem-hang",
    type: "SUPPORT",
  },
  {
    id: "support-faq",
    title: "Câu hỏi thường gặp",
    slug: "faq",
    type: "SUPPORT",
  },
];
const Footer = () => {
  return (
    <div className="relative w-full h-auto bg-[#613613] mt-30 py-20">
      <Image
        src="/images/birdnest-footer-decor.png"
        alt=""
        width={200}
        height={200}
        className="w-30 lg:w-40 h-auto absolute top-0 left-1/2 -translate-1/2"
      />
      <div
        className="max-w-[1200px] mx-auto px-6
                  grid grid-cols-2 lg:flex lg:flex-row lg:items-start lg:justify-between gap-8"
      >
        <Image
          src="/images/footer-logo.png"
          alt="logo"
          width={80}
          height={80}
          className="hidden xl:block self-auto"
        />
        <div className="col-span-2 flex flex-col gap-2 text-xs lg:text-sm">
          <h4 className="font-semibold text-sm! lg:text-base!  text-[#C47856]">
            {siteInfoMock.companyName}
          </h4>
          <p className="text-white">{siteInfoMock.info}</p>
          <div className="flex flex-row items-center justify-start gap-1">
            <p className="font-semibold text-[#C47856]">Email:</p>
            <p className="text-white">{siteInfoMock.email}</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-1">
            <p className="font-semibold text-[#C47856]">Hotline:</p>
            <p className="text-white">{siteInfoMock.hotline}</p>
          </div>
          {siteInfoMock.branches.map((br, idx) => (
            <div
              key={br.id}
              className="text-zinc-200 flex flex-row items-center justify-start gap-1"
            >
              <span className="font-semibold text-xs lg:text-sm text-[#C47856]">
                Showroom {idx + 1}:
              </span>
              <p className="text-xs lg:text-sm leading-relaxed">{br.address}</p>
            </div>
          ))}
        </div>
        <div className="col-span-1 flex flex-col gap-2 text-xs lg:text-sm">
          <h4 className="text-nowrap font-semibold text-sm! lg:text-base! text-[#C47856]">
            CHÍNH SÁCH
          </h4>
          {footerPagesMock.map((fp) => {
            if (fp.type === "POLICY") {
              return (
                <Link
                  key={fp.id}
                  href={`/${fp.slug}`}
                  className="text-zinc-200 hover:text-[#C47856] transition-colors duration-200 text-nowrap"
                >
                  {fp.title}
                </Link>
              );
            }
          })}
          {/* <Link href="">
            <Image
              src="/images/logo-da-thong-bao-bo-cong-thuong.webp"
              alt="logo"
              width={80}
              height={80}
              className="w-30 h-auto"
            />
          </Link> */}
        </div>
        <div className="col-span-1 flex flex-col gap-2 text-xs lg:text-sm">
          <h4 className="text-nowrap font-semibold text-sm! lg:text-base! text-[#C47856]">
            HỖ TRỢ KHÁCH HÀNG
          </h4>
          {footerPagesMock.map((fp) => {
            if (fp.type === "SUPPORT") {
              return (
                <Link
                  key={fp.id}
                  href={`/${fp.slug}`}
                  className="text-zinc-200 hover:text-[#C47856] transition-colors duration-200 text-nowrap"
                >
                  {fp.title}
                </Link>
              );
            }
          })}
          <div className="flex flex-row items-center justify-start gap-2">
            <Image
              src="/images/qrcode_fb.png"
              alt="QR Code Facebook"
              width={80}
              height={80}
              className="w-20 xl:w-30 h-auto"
            />
            <Image
              src="/images/qrcode_sh.png"
              alt="QR Code shopee"
              width={80}
              height={80}
              className="w-20 xl:w-30 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
