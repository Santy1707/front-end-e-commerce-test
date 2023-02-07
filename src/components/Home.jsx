import React, { useEffect, useState } from "react";
import { getAllProducts } from "../utils/functions";
import SearchBar from "./SearchBar";

export default function Home() {
  const [productsApi, setProductsApi] = useState([])
  useEffect(() => {
    const getProducts = async () => {
      const getFunction = await getAllProducts()
      setProductsApi(getFunction)
    }
    getProducts()
  }, [])

  return(
    <div>
      <h1>Home</h1>
        <SearchBar products={productsApi}></SearchBar>
    </div>);
}
