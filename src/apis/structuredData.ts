import {
  BreakdownContentReqType,
  BreakdownContentResType,
  StructuredDataReqType,
  StructuredDataResType,
} from "@/types/structuredData";
import instance from "@/utils/axiosInstance";


export const getStructuredData = async (params?: StructuredDataReqType) => {
  
  return await instance.get<StructuredDataResType>("/api/v1/structured-data", {
    params,
  });
};

export const getBreakdownContent = async (params: BreakdownContentReqType) => {
  return await instance.get<BreakdownContentResType>(
    `/api/v1/structured-data/content`,
    { params }
  );
};
