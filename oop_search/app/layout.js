import ReduxLayout from "@/components/Layout/ReduxLayout";
import ThemeLayout from "@/components/Layout/ThemeLayout";
import UseQueryWrap from "@/components/Layout/UseQueryWrap";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.scss";

export const metadata = {
  title: "Tra cứu kiến thức OOP",
  description:
    "Trang web tra cứu kiến thức OOP, bao gồm các định nghĩa, tính chất, các dạng bài tập.",
  applicationName: "Tra cứu kiến thức OOP",
  authors: [{ name: "Thinh Le", url: "https://lethinh-blog.site" }],
  keywords: [
    "OOP",
    "Lập trình hướng đối tượng",
    "Học oop",
    "Học lập trình hướng đối tượng",
    "kế thừa",
    "đa hình",
    "trừu tượng hóa dữ liệu",
    "bài tập oop",
    "bài tập lập trình hướng đối tượng",
    "code oop",
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Tra cứu kiến thức OOP",
    description:
      "Trang web tra cứu kiến thức OOP, bao gồm các định nghĩa, tính chất, các dạng bài tập.",
    images: [
      {
        url: "https://i.imgur.com/P7uOV9n.png",
        width: 1800,
        height: 1600,
      },
      {
        url: "https://i.imgur.com/P7uOV9n.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});
const notoSans = Noto_Sans({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={notoSans.className}>
      <body>
        <ReduxLayout>
          <ThemeLayout>
            <UseQueryWrap>{children}</UseQueryWrap>
          </ThemeLayout>
        </ReduxLayout>
      </body>
    </html>
  );
}
