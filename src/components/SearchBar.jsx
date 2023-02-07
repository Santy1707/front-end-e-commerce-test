import React, { useEffect, useState } from "react";
import { findProducts, searchByPrice, sortPrice, filterByCategory } from "../utils/functions";
import Modal from "./Modal";

export default function SearchBar({ products }) {
  const [productos, setProductos] = useState([]);
  const [productosFilter, setProductosFilter] = useState([]);
  const [carrito, setCarrito] = useState([])
  const [showProducts, setShowProducts] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [nameSearch, setNameSearch] = useState("")
  const [prices, setPrices] = useState({
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    setProductos(products)
    setProductosFilter(products)
  }, [products])

  const handleCarrito = (e) => {
    const productToAdd = productos.filter((item) => item._id === e.target.value)
    console.log(productToAdd, e.target.value)
    setCarrito([
      ...carrito,
      productToAdd[0]
    ])
  }
  console.log(carrito)

  const handleChangeName = (e) => {
    setNameSearch(e.target.value)
  }

  const handleSearch = () => {
    const result = findProducts(productos, nameSearch)
    setProductosFilter(result)
    setShowProducts(true)
  }

  const allValuesPriceFilled = Object.values(prices).every((value) => value !== "");
  const priceError = parseInt(prices.maxPrice) < parseInt(prices.minPrice) ? true : false;
  const handlePricesChange = (event) => {
    setPrices({
      ...prices,
      [event.target.name]: event.target.value,
    });
  };
  const handleSearchPrice = () => {
    const resultPrices = searchByPrice(productos, prices);
    setProductosFilter(resultPrices);
    setShowProducts(true)
  };

  const handleOrderPrice = (e) => {
    const orderPrice = sortPrice(productosFilter, e.target.value)
    console.log(orderPrice)
    setProductosFilter(orderPrice)
    setShowProducts(true)
  }

  const handleFilterCategory = (e) => {
    const categoryFilter = filterByCategory(productos, e.target.value)
    setProductosFilter(categoryFilter)
    setShowProducts(true)
  }

  const uniqueCategories = [...new Set(products.map(item => item.category))];

  if(!products){
    return <h1>Loading.....</h1>
  }
  return( 
  <div>
    <div className="search__product">
    <button onClick={ () => setShowModal(true)}> Purchase</button>
    
    <label htmlFor="">Buscar producto</label>
      <input 
        type="text"
        placeholder="buscar producto"
        value={nameSearch}
        onChange={handleChangeName}
      />
      <button value={nameSearch} onClick={handleSearch}>Buscar</button>
    </div>


    <div className="navbar__prices">
          <h1>Filtrar por precio</h1>
            <label>Filter by prices</label>
            <input
              type="number"
              name="minPrice"
              placeholder="min-price"
              value={prices.minPrice}
              onChange={handlePricesChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="max-price"
              value={prices.maxPrice}
              onChange={handlePricesChange}
            />
            {priceError && (
              <div
                style={{ color: "red" }}
              >{`El precio maximo elegido: ${prices.maxPrice} debe ser mayor al precio minimo elegido: ${prices.minPrice}`}</div>
            )}
            <button
              disabled={!allValuesPriceFilled | priceError}
              onClick={handleSearchPrice}
            >
              Filtrar
            </button>
          </div>


    <div className="search__byCategory">
      <select name="" id="" onChange={handleFilterCategory}>
        <option value="">Categeory</option>
        {uniqueCategories?.map((category) => {
          return (
            <>
              <option 
                name="category"
                value={category}
                placeholder="category"
                key={category}
                >
                  {category}
              </option>
            </>
          )
        })}
      </select>
    </div>

    <div>
      <select name="orderPrice" id="" onChange={(e) => handleOrderPrice(e)}>
        <option value="">Order price</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    <div>
    {showProducts && Array.isArray(productosFilter) ? (
          productosFilter.map((product) => {
            return (
              <div className="flights__card" key={product._id}>
                <h2>ID: {product._id}</h2>
                <h1>From: {product.name}</h1>
                <p>To: {product.description}</p>
                <h2>Price: {product.price}</h2>
                <h2>Hora: {product.category}</h2>
                <h2>AvailableSeats: {product.availableUnits}</h2>
                {/* Renderizado condicional del modal, XD */}
                <button value={product._id} onClick={(e) => handleCarrito(e)}>
                  Add to cart
                </button>
              </div>
            );
          })
        ) : (
          <h1>{productosFilter.message}</h1>
        )}
    </div>
      <div>
        {showModal && <Modal carritoShop={carrito} setModal={setShowModal}> </Modal>  }
      </div>
  </div>
  );
}

{/* <Modal carritoShop={carrito}> </Modal> */}