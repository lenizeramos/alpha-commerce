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

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data.length]);

  
  useEffect(() => {
    if (data.length > 0) {
      const selectedItem = data.find((entry) => String(entry.fields.id) === String(id));
      setItem(selectedItem || null);
    }
  }, [id, data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return <p>Item not found.</p>;

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

      <div className="reviews mt-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        {item.fields.comments?.map((review: any, index: number) => (
          <div key={index} className="review mt-4 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold">{review.fields.title}</h3>
            <p>{review.fields.comment}</p>
            <p className="text-sm text-gray-500">Date: {new Date(review.fields.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsPage;

