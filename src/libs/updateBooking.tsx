export default async function updateReserve(
    startTime: string,
    endTime: string,
    token: string,
    id: string
  ) {
    const res = await fetch(
      `http://localhost:5000/api/v1/reserves/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          start: startTime,
          end: endTime,
        })
      }
    );
  
    if (!res.ok) {
      throw new Error('Failed to update reservation');
    }
  
    return await res.json();
  }