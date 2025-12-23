const AMIIBO_URL = 'https://www.amiiboapi.com/api/';
const NOOKIPEDIA_URL = 'https://api.nookipedia.com/';

async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP Error! Status: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error('Amiibo API 호출 중 오류 발생');
    throw error;
  }
}

export async function getAmiiboData<T>(endPoint: string) {
  return await fetchData<T>(`${AMIIBO_URL}${endPoint}`);
}

export async function getNookipediaData<T>(endPoint: string) {
  const API_KEY = process.env.NOOKIPEDIA_API || '';

  return await fetchData<T>(`${NOOKIPEDIA_URL}${endPoint}`, {
    headers: {
      'X-API-KEY': API_KEY,
      'Accept-Version': '1.0.0',
    },
  });
}
