// const AMIIBO_URL = 'https://www.amiiboapi.com/api/';
const AMIIBO_URL = 'https://amiiboapi.org/api/';
const NOOKIPEDIA_URL = 'https://api.nookipedia.com/';
// const NOOKIPEDIA_URL = 'https://nookipedia.com/w/api.php'; // 임시

// const mockData = {
//   amiibo: [
//     {
//       amiiboSeries: 'Animal Crossing Card Series 1',
//       character: 'Marshal', // 쭈니
//       gameSeries: 'Animal Crossing',
//       head: '018b0000',
//       image:
//         'https://raw.githubusercontent.com/NintenZone/Amiibo-API/master/images/icon_018b0000-00000002.png',
//       name: 'Marshal',
//       personality: 'Smug',
//       release: {
//         au: '2015-11-09',
//         eu: '2015-11-20',
//         jp: '2015-10-29',
//         na: '2015-11-20',
//       },
//       tail: '00000002',
//       type: 'Card',
//     },
//     {
//       amiiboSeries: 'Animal Crossing Card Series 2',
//       character: 'Beau', // 피터
//       gameSeries: 'Animal Crossing',
//       head: '01920000',
//       image:
//         'https://raw.githubusercontent.com/NintenZone/Amiibo-API/master/images/icon_01920000-00000002.png',
//       name: 'Beau',
//       personality: 'Lazy',
//       release: {
//         au: '2016-01-21',
//         eu: '2016-01-29',
//         jp: '2016-01-14',
//         na: '2016-01-19',
//       },
//       tail: '00000002',
//       type: 'Card',
//     },
//     {
//       amiiboSeries: 'Animal Crossing Card Series 3',
//       character: 'Lolly', // 사이다
//       gameSeries: 'Animal Crossing',
//       head: '019a0000',
//       image:
//         'https://raw.githubusercontent.com/NintenZone/Amiibo-API/master/images/icon_019a0000-00000002.png',
//       name: 'Lolly',
//       personality: 'Normal',
//       release: {
//         au: '2016-03-19',
//         eu: '2016-03-18',
//         jp: '2016-03-24',
//         na: '2016-03-10',
//       },
//       tail: '00000002',
//       type: 'Card',
//     },
//   ],
// };

async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error(`API 호출 중 오류 발생`);
    throw error;
  }
}

export async function getAmiiboData<T>(endPoint: string) {
  return await fetchData<T>(`${AMIIBO_URL}${endPoint}`);
  // return mockData; // 가짜 데이터 반환으로 작업 진행
}

export async function getNookipediaData<T>(endPoint: string) {
  // 임시
  // const cargoUrl = `${NOOKIPEDIA_URL}?action=cargoquery&format=json&tables=nh_villager&fields=name,species,image,icon&limit=500`;

  // return await fetchData<T>(cargoUrl);

  const API_KEY = process.env.NOOKIPEDIA_API || '';

  return await fetchData<T>(`${NOOKIPEDIA_URL}${endPoint}`, {
    headers: {
      'X-API-KEY': API_KEY,
      'Accept-Version': '1.0.0',
    },
  });
}
