import Content from "@/components/Learn/PhanMuc/Content";

export async function generateStaticParams() {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/phanmuc`
  ).then((res) => res.json());

  return posts.data.map((post) => ({
    slug: post.slug,
  }));
}

const Home = async ({ params }) => {
  const { slug } = params;
  const data = await getDataPhanMuc(slug);

  return (
    <>
      <Content data={data} />
    </>
  );
};
export default Home;
async function getDataPhanMuc(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/phanmuc/chitiet/${slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const item = await getDataPhanMuc(params.slug);
  return {
    title: `Phân mục: ${item.data.tenPhanMuc}`,
    description: `Phân mục: ${item.data.tenPhanMuc}`,
  };
}
