import { BACKEND_URL } from "@/config";

export default async function updateReserve(
    startTime: string,
    endTime: string,
    table: string,
    token: string,
    id: string
  ) {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/v1/reserves/${id}`,
        {
          method: 'PUT',
          mode:'cors',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            mode:'cors'

          },
          body: JSON.stringify({
            start: startTime,
            end: endTime,
            table: table
          })
        }
      );
    
      if (!res.ok) {
        throw new Error('Failed to update reservation');
      }
    
      return await res.json();

    } catch(error) {
      console.error(error);
      throw error;
    }
  }