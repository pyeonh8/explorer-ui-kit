const BASE_URL = 'https://www.amiiboapi.com/api/';

export async function getAmiiboData<T>(endPoint: string): Promise<T> {
  const url = `${BASE_URL}${endPoint}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP Error! Status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Amiibo API 호출 중 오류 발생');
    throw error;
  }
}
