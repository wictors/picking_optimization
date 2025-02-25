import axios from 'axios';

const API_KEY = process.env.API_KEY;
const WAREHOUSE_URL = process.env.WAREHOUSE_URL;

export async function getProductPositions(productId: string): Promise<any> {
  try {
    const url = `${WAREHOUSE_URL}/${productId}/positions`;
    const response = await axios.get(url, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      'Error during get product positions from external api',
      error,
    );
    throw error;
  }
}
