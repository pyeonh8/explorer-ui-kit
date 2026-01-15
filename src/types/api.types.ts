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

// 누키피디아 API
export interface nh_details {
  icon_url: string;
}

export interface NookipediaVillagersProps {
  name: string;
  id: string;
  image_url: string;
  nh_details: nh_details;
}

export type NookipediaVillagersResponse = NookipediaVillagersProps[];
