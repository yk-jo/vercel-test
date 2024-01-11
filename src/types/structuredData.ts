export type StructuredDataReqType = {
  idHistory: number;
};

export type StructuredDataItem = {
  idData: number;
  manageCode: string; //관리번호
  name: string; //설비명
  repairDate: string; //수리일자
  breakdownContent: string; //고장내용
  breakdownPart: string; //고장부품
  breakdownType: string; //불량유형
  repairContent: string; //조치내용
  repairShop: string; //수리처
  repairTime: number; //수리시간
  repairCost: number; //수리금액
  //
  year?: number;
  quarter?: number;
  month?: number;
  day?: number;
  season?: string;
  usedTime?: number;
};
export type StructuredDataResType = StructuredDataItem[];

export type BreakdownContentType =
  | "FACILITY" // 설비별 고장 빈도
  | "BREAKDOWN_PART" // 고장부품 별 빈도
  | "BREAKDOWN_TYPE" // 불량유형 별 빈도
  | "REPAIR_CONTENT" // 조치내용 별 빈도
  | "REPAIR_SHOP" // 수리처 별 고장빈도
  | "REPAIR_TIME" // 수리시간 별 빈도
  | "REPAIR_COST" // 수리금액 별 빈도
  | "PERIOD_BREAKDOWN" // 월별/분기별/연별 빈도
  | "FACILITY_TYPE"; // 설비별 불량유형 빈도

export type BreakdownPeriodType = "MONTH" | "QUARTER" | "YEAR";
export type BreakdownContentReqType = {
  type: BreakdownContentType;
  period?: BreakdownPeriodType;
  query: string;
  facilityName?: string;
};

export type BreakdownContentResType = { breakdownContent: string }[];
