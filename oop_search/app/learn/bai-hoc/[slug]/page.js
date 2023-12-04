import Content from "@/components/Learn/BaiHoc/Content";

export async function generateStaticParams() {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/baihoc`
  ).then((res) => res.json());

  return posts.data.map((post) => ({
    slug: post.slug,
  }));
}

const Home = async ({ params }) => {
  const { slug } = params;
  const data = await getDataBaiHoc(slug);
  return (
    <>
      <Content data={data} />
    </>
  );
};
export default Home;
async function getDataBaiHoc(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT_SERVER}/api/v1/baihoc/chitiet/${slug}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function generateMetadata({ params }) {
  const item = await getDataBaiHoc(params.slug);
  return {
    title: `Bài học: ${item.data.tenBaiHoc}`,
    description: `Bài học: ${item.data.tenBaiHoc}`,
  };
}
