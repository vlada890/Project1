
export async function fetchCars() {//utility function , can use it in many areas

  const headers= {
    'x-rapidapi-key': '3c9bbb2814msh8548cccd1596cf9p1ccfefjsnd5e76f2bdb8e',
    'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
  }

  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars`,
    {
      headers: headers,
    }
  );

  const result = await response.json();

  return result;
}
