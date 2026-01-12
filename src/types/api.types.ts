// 추가 정보 (번역 및 속성)
export interface EntityExtraInfo {
  koName: string;
  personality: string;
}

// 아미보카드 API
export interface AmiiboProps {
  amiiboSeries: string;
  character: string;
  gameSeries: string;
  head: string;
  image: string;
  name: string;
  release: {
    au: string;
    eu: string;
    jp: string;
    na: string;
  };
  tail: string;
  type: string;
}

// 아미보카드 Response
export interface AmiiboApiResponse {
  amiibo: AmiiboProps[];
}

// 아미보카드 번역
export type TranslatedAmiibo = AmiiboProps & EntityExtraInfo;

// 캐릭터 주민 API
export interface nh_details {
  icon_url: string;
}

export interface NookipediaVillagersProps {
  name: string;
  id: string;
  image_url: string;
  nh_details: nh_details;
  species: string;
}

// 캐릭터 주민 Response
export type NookipediaVillagersResponse = NookipediaVillagersProps[];

// 캐릭터 주민 번역
export type TranslateVillager = NookipediaVillagersProps & EntityExtraInfo;
