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
      // Authorization: 'Token c75ac915b957a299350028888cf832efa86e5b1c'
      Authorization: 'Token 1b1804aa491561e6d421f805e17763e56e99f2f0' // Token de pruueba
    }
  };