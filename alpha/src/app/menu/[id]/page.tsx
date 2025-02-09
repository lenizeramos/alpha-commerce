"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { RootState, AppDispatch } from "../../context/store";
import { fetchData } from "../../context/slices/DataSlice";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.data);
  const [item, setItem] = useState<any>(null);

  // 🔹 Cargar datos si aún no están en Redux
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data.length]);

  // 🔹 Esperar hasta que los datos estén disponibles para buscar el ítem
  useEffect(() => {
    if (data.length > 0) {
      const selectedItem = data.find((entry) => String(entry.fields.id) === String(id));
      setItem(selectedItem || null);
    }
  }, [id, data]);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>El ítem no fue encontrado.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{item.fields.name}</h1>
      <img
        src={`https:${item.fields.image.fields.file.url}`}
        alt={item.fields.name}
        className="w-64 h-64 object-cover"
      />
      <p className="text-lg text-gray-700">{item.fields.description}</p>
      <p className="text-xl text-green-600">${item.fields.price.toFixed(2)}</p>
    </div>
  );
};

export default DetailsPage;

