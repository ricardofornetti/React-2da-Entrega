import React, { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { getData } from "../utils/product";
import { useParams } from "react-router-dom";
import { getDoc, getFirestore, doc} from 'firebase/firestore'


const ItemDetailContainer = () => {
  const [productoPuntual, setProductoPuntual] = useState({});
  const [cargando, setCargando] = useState(false);
  const { id } = useParams();

/**
 const ItemDetailContainer = () => {
  const [item, setItem] = useState({})
  const [loading, setLoading] = useState (false)
  const {itemId } = useParams()
 */

  useEffect(() => {
    const db = getFirestore();
    setCargando(true);
    const itemsCollection = doc(db, 'products', id);
    getDoc (itemsCollection).then ((snapshot)=>{
    const cat={ id: snapshot.id, ...snapshot.data()}
    setProductoPuntual (cat)
    setCargando(false)
    });
  }, [id]) ;





  //useEffect(() => {
    //setCargando(true);
    //getData
    //.then((res) => setProductoPuntual(res.find((prod) => prod.id === parseInt(id))))
     // .catch((error) => console.log(error))
     // .finally(() => setCargando(false));
  //}, []);

  return (
    <>
      <div>
        {cargando ? (
          <button className="btn btn-dark" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Cargando...
          </button>
        ) : (
          <ItemDetail item={productoPuntual} />
        )}
      </div>
    </>
  );
};

export default ItemDetailContainer;
