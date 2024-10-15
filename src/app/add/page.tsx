"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Species } from "../../types";

export default function AddSpecies() {
  const [species, setSpecies] = useState<Omit<Species, "id">>({
    faoCode: "",
    typeOfFish: "",
    scientificName: "",
    englishName: "",
    indonesianName: "",
    localName: "",
    typeOfWater: "",
    imageUrl: null,
    statusInIndonesia: "",
    fishUtilization: "",
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSpecies((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://test.api.sahabatlautlestari.com/species",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(species),
        }
      );
      if (response.ok) {
        alert("Species added successfully");
        router.push("/");
      } else {
        const data = await response.json();
        alert(`Error adding species: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding species:", error);
      alert("An error occurred while adding the species");
    }
  };

  const friendlyLabels: { [key: string]: string } = {
    faoCode: "FAO Code",
    typeOfFish: "Type of Fish",
    scientificName: "Scientific Name",
    englishName: "English Name",
    indonesianName: "Indonesian Name",
    localName: "Local Name",
    typeOfWater: "Type of Water",
    imageUrl: "Image URL",
    statusInIndonesia: "Status in Indonesia",
    fishUtilization: "Fish Utilization",
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Add New Species
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          {Object.keys(species).map((key) => (
            <div key={key} className="mb-4">
              <label
                htmlFor={key}
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                {/* {key.charAt(0).toUpperCase() + key.slice(1)} */}
                {friendlyLabels[key] || key}
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={species[key as keyof Omit<Species, "id">] as string}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={key !== "imageUrl"}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition duration-300 ease-in-out"
          >
            Add Species
          </button>
        </form>
      </div>
    </div>
  );
}
