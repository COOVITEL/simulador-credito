export const getDatas = async (url: string) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Token ${import.meta.env.VITE_TOKEN}`
    }
  };