import Content from "@/components/Learn/PhanLoai/Content";

export async function generateStaticParams() {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/phanloai`
  ).then((res) => res.json());

  return posts.data.map((post) => ({
    slug: post.slug,
  }));
}

const Home = async ({ params }) => {
  const { slug } = params;
  const data = await getDataPhanLoai(slug);

  return (
    <>
      <Content data={data} />
    </>
  );
};
export default Home;

async function getDataPhanLoai(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/phanloai/chitiet/${slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const item = await getDataPhanLoai(params.slug);
  return {
    title: `Phân loại: ${item.data.tenPhanLoai}`,
    description: `Phân loại: ${item.data.tenPhanLoai}`,
  };
}
