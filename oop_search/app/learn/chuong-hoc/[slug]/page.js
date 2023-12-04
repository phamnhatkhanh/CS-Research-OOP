import Content from "@/components/Learn/ChuongHoc/Content";

export async function generateStaticParams() {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/chuonghoc`
  ).then((res) => res.json());

  return posts.data.map((post) => ({
    slug: post.slug,
  }));
}

const Home = async ({ params }) => {
  const { slug } = params;
  const data = await getDataChuongHoc(slug);

  return (
    <>
      <Content data={data} />
    </>
  );
};
export default Home;
async function getDataChuongHoc(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/chuonghoc/chitiet/${slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const item = await getDataChuongHoc(params.slug);
  return {
    title: `Chương học: ${item.data.tenChuongHoc}`,
    description: `Chương học: ${item.data.tenChuongHoc}`,
  };
}
