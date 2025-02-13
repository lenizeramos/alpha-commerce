"use client";
import Image from "next/image";
import { BsBasket2 } from "react-icons/bs";
import { Princess_Sofia } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../context/store";
import { fetchData } from "../context/slices/DataSlice";
import Link from "next/link";
import "./menu.css";

const PrincessSofia = Princess_Sofia({
  weight: "400",
  subsets: ["latin"],
});

export default function Menu() {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.data
  );
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, data.length]);

  const openModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    window.history.pushState(null, '', `/menu/${item.fields.id}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    window.history.pushState(null, '', '/menu');
  };

  useEffect(() => {
    const handlePopState = () => {
      closeModal();
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <>
      <div
        className={`ContainerMenu grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto py-8 ${PrincessSofia.className}`}
      >
        {data.length > 0 ? (
          data.map((entry: any) => {
            const { id, name, image, price, description, category, rating } =
              entry.fields as any;
            const imageUrl = image?.fields?.file.url || "";

            return (
              <div key={id} onClick={(e) => { e.stopPropagation(); openModal(entry); }}>
                <div
                  className="containerItem flex flex-col items-center justify-center bg-white pb-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="containerImg w-full h-40 mb-4 relative overflow-hidden">
                    <Image
                      src={`https:${imageUrl}`}
                      alt={name}
                      //   width={200}
                      //   height={100}
                      fill
                      className="rounded-lg"
                    />
                  </div>
                  <div className="info w-full flex flex-col items-start px-8 gap-2">
                    <div className="rating flex text-yellow-500">
                      {Array.from({ length: rating }, (_, index) => (
                        <span key={index}>★</span>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 text-center">
                      {name}
                    </h2>
                    <div className="price flex justify-between w-full items-center">
                      <p className="text-lg font-medium text-green-600 mb-2">
                        ${price.toFixed(2)}
                      </p>
                      <div className="icon rounded-full bg-gray-200 text-black w-10 h-10 flex items-center justify-center cursor-pointer">
                        <BsBasket2 size={20} className="cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center">No items available</div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {selectedItem && (
              <>
                <h1 className="text-3xl font-bold">{selectedItem.fields.name}</h1>
                <img
                  src={`https:${selectedItem.fields.image.fields.file.url}`}
                  alt={selectedItem.fields.name}
                  className="w-64 h-64 object-cover"
                />
                <p className="text-lg text-gray-700">{selectedItem.fields.description}</p>
                <p className="text-xl text-green-600">${selectedItem.fields.price.toFixed(2)}</p>
                <button 
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" 
                  onClick={closeModal}
                >
                  Cerrar
                </button>
                <Link href={`/menu/${selectedItem.fields.id}`}>
                  <button 
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
                  >
                    Ver Detalles
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
