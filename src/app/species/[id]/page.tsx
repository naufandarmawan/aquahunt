"use client";

import { useState, useEffect } from "react";
import { Species } from "../../../types";

interface SpeciesDetailProps {
  params: {
    id: string;
  };
}

export default function SpeciesDetail({ params }: SpeciesDetailProps) {
  const [species, setSpecies] = useState<Species | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/species/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Species not found");
        }
        const data = await response.json();
        setSpecies(data);
      } catch (error) {
        console.error("Error fetching species:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, [params.id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (!species) {
    return <div className="text-center mt-8">Species not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{species.scientificName}</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div
            className="w-full h-64 rounded-lg mb-4 bg-cover bg-center"
            style={{
              backgroundColor: species.imageUrl ? undefined : "#e2e8f0",
              backgroundImage: species.imageUrl
                ? `url(${species.imageUrl})`
                : "none",
            }}
          ></div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>
                <strong>English Name:</strong> {species.englishName}
              </p>
              <p>
                <strong>Indonesian Name:</strong> {species.indonesianName}
              </p>
              <p>
                <strong>Local Name:</strong> {species.localName}
              </p>
              <p>
                <strong>FAO Code:</strong> {species.faoCode}
              </p>
              <p>
                <strong>Type of Fish:</strong> {species.typeOfFish}
              </p>
            </div>
            <div>
              <p>
                <strong>Type of Water:</strong> {species.typeOfWater}
              </p>
              <p>
                <strong>Status in Indonesia:</strong>{" "}
                {species.statusInIndonesia}
              </p>
              <p>
                <strong>Fish Utilization:</strong> {species.fishUtilization}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
