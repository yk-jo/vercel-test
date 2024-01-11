import apis from "@/apis";
import List from "@/containers/test/list";
import { StructuredDataItem } from "@/types/structuredData";

async function getData() {
  const data = await apis.StructuredData.getStructuredData();

  const structuredData = data.data;

  return structuredData;
}

export default async function ListPage() {
  const data: StructuredDataItem[] = await getData();
  return <List data={data} />;
}
