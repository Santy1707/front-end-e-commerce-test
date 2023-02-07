async function getAllProducts(){
  try {
    const url = 'https://products-api-production-6137.up.railway.app/api/products'
    const data = await fetch(url)
    .then( res => res.json())
    return data
  } catch (error) {
    console.log(error)
  }
}

async function getProductId(id) {
  try {
    const url = `http://products-api-production-6137.up.railway.app/api/products/${id}`
    const product = await fetch(url)
    .then(res => res.json())
    return product
  } catch (error) {
    console.log(error)
  }
}


function findProducts(products, value){
  const productsFind = products.filter( (item) => item.name.toLowerCase().includes(value.toLowerCase()))
  return productsFind.length ? productsFind : {message: 'No hay productos con ese nombre'} 
}

function searchByPrice( products, prices ){ 
  const result = products.filter( (product) => product.price >= prices.minPrice && product.price <= prices.maxPrice )
  return result.length ? result : {message: 'No hay vuelos para ese rango de precios'}
}

function sortPrice(flights, value) {
  console.log(value)
  if (value === 'asc') {
    const sortPrices = flights.sort((a, b) => b.price - a.price )
    console.log(sortPrices)
    return sortPrices
  } else if (value === 'desc') {
    const sortPrices = flights.sort((a, b) => a.price - b.price )
    console.log(sortPrices)
    return sortPrices
  }
  return flights
}

function filterByCategory(flights, value) {
  console.log(value)
  const result = flights.filter((item) => item.category === value)
  console.log(result)
  return result
}

export { getAllProducts, findProducts, searchByPrice, sortPrice, filterByCategory, getProductId }