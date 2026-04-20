import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

function TileCRUD() {
  const [tileName, setTileName] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const [tiles, setTiles] = useState([]);
  const [editId, setEditId] = useState(null);

  const tileRef = collection(db, "tiles");

  const normalizeTileField = (value) => value ?? "";

  const getTiles = async () => {
    const data = await getDocs(tileRef);
    setTiles(
      data.docs.map((d) => ({
        ...d.data(),
        tileName: normalizeTileField(d.data().tileName),
        size: normalizeTileField(d.data().size),
        color: normalizeTileField(d.data().color),
        qty: normalizeTileField(d.data().qty),
        price: normalizeTileField(d.data().price),
        id: d.id,
      }))
    );
  };

  useEffect(() => {
    getTiles();
  }, []);

  const saveTile = async () => {
    const tileData = {
      tileName: normalizeTileField(tileName),
      size: normalizeTileField(size),
      color: normalizeTileField(color),
      qty: normalizeTileField(qty),
      price: normalizeTileField(price),
    };

    if (editId) {
      await updateDoc(doc(db, "tiles", editId), tileData);
      setEditId(null);
    } else {
      await addDoc(tileRef, tileData);
    }

    setTileName("");
    setSize("");
    setColor("");
    setQty("");
    setPrice("");
    getTiles();
  };

  const editTile = (tile) => {
    setTileName(normalizeTileField(tile.tileName));
    setSize(normalizeTileField(tile.size));
    setColor(normalizeTileField(tile.color));
    setQty(normalizeTileField(tile.qty));
    setPrice(normalizeTileField(tile.price));
    setEditId(tile.id);
  };

  const deleteTile = async (id) => {
    await deleteDoc(doc(db, "tiles", id));
    getTiles();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Tiles Inventory</h2>

      <input className="form-control my-2" placeholder="Tile Name" value={tileName} onChange={(e)=>setTileName(e.target.value)} />
      <input className="form-control my-2" placeholder="Size" value={size} onChange={(e)=>setSize(e.target.value)} />
      <input className="form-control my-2" placeholder="Color" value={color} onChange={(e)=>setColor(e.target.value)} />
      <input className="form-control my-2" placeholder="Quantity" value={qty} onChange={(e)=>setQty(e.target.value)} />
      <input className="form-control my-2" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />

      <button className="btn btn-primary w-100" onClick={saveTile}>
        {editId ? "Update Tile" : "Add Tile"}
      </button>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Color</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tiles.map((tile) => (
            <tr key={tile.id}>
              <td>{tile.tileName}</td>
              <td>{tile.size}</td>
              <td>{tile.color}</td>
              <td>{tile.qty}</td>
              <td>{tile.price}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editTile(tile)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteTile(tile.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TileCRUD;