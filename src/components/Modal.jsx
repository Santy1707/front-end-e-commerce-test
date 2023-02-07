import React, {useState, useEffect} from 'react'

export default function Modal({carritoShop, setModal}) {
  const [carritoModal, setCarritoModal] = useState([])
  useEffect(() => {
    if (carritoShop) {
      console.log('me ejecuto')
        setCarritoModal(carritoShop);
    }
  }, [carritoShop]);

  const handleSaveData = () => {
      localStorage.setItem(
        "indatum-car-reservation",
        JSON.stringify(carritoModal)
      );
  }

  if(!carritoShop.length) {
    return <h1>Loading.......</h1>
  }

  return (
    <div>
    <div>
    <h1>Modal....</h1>
      {carritoModal.map((product) =>{
        return (
          <>
          <h2>ID: {product._id}</h2>
                <h1>From: {product.name}</h1>
                <p>To: {product.description}</p>
                <h2>Price: {product.price}</h2>
                <h2>Hora: {product.category}</h2>
                <h2>AvailableSeats: {product.availableUnits}</h2>
          </>
      )})}
      <button onClick={() => setModal(false)}>Cancel</button>
      <button onClick={handleSaveData}>Comprar</button>
    </div>
    </div>
  )
}
