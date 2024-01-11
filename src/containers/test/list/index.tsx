import { StructuredDataItem } from "@/types/structuredData";

interface ListProps {
  data: StructuredDataItem[];
}
export default function List({ data }: ListProps) {
  return <div>{data.map((item) => item.breakdownContent)}</div>;
}
