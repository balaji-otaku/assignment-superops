import Tree from "../components/Tree/Tree";

export default function Home() {
  return <Tree />;
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
