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

export interface AmiiboApiResponse {
  amiibo: AmiiboProps[];
}

export interface TranslatedAmiibo extends AmiiboProps {
  koName: string;
  personality: string;
}

// 누키피디아 API
export interface nh_details {
  icon_url: string;
}

// 누키피디아 주민
export interface NookipediaVillagersProps {
  name: string;
  id: string;
  image_url: string;
  nh_details: nh_details;
}

export type NookipediaVillagersResponse = NookipediaVillagersProps[];

// 누키피디아 아이템
export interface NookipediaItemProps {
  name: string;
  number?: number;
  image_url: string;
  render_url?: string;
}

export type NookipediaItemResponse = NookipediaItemProps[];
