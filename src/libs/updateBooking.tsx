export default async function updateReserve(
    startTime: string,
    endTime: string,
    table: string,
    token: string,
    id: string
  ) {
    const res = await fetch(
      `https://presentation-day-1-backend-project-one.vercel.app/api/v1/reserves/${id}`,
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