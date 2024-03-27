export default async function updateReserve(
    startTime: string,
    endTime: string,
    table: string,
    token: string,
    id: string
  ) {
    const BACKEND_URL= process.env.BACKEND_URL

    const res = await fetch(
      `${BACKEND_URL}/api/v1/reserves/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
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
  }