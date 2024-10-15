import Link from "next/link";
import { Species } from "../types";

interface SpeciesListProps {
  species: Species[];
  isLoggedIn: boolean;
  onDelete: () => void;
}

export default function SpeciesList({
  species,
  isLoggedIn,
  onDelete,
}: SpeciesListProps) {
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this species?")) {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `https://test.api.sahabatlautlestari.com/species/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          onDelete();
          alert("Species deleted successfully");
        } else {
          alert("Error deleting species");
        }
      } catch (error) {
        console.error("Error deleting species:", error);
        alert("An error occurred while deleting the species");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {Array.isArray(species) && species.length > 0 ? (
        species.map((fish) => (
          <div
            key={fish.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            <Link href={`/species/${fish.id}`}>
              <div
                className="h-48 bg-gray-200 bg-cover bg-center"
                style={{
                  backgroundColor: fish.imageUrl ? undefined : "#e2e8f0",
                  backgroundImage: fish.imageUrl
                    ? `url(${fish.imageUrl})`
                    : "none",
                }}
              ></div>
              <h2 className="text-xl font-semibold p-4 bg-gray-50 text-gray-800">
                {fish.scientificName}
              </h2>
            </Link>
            <div className="p-4">
              <p className="text-gray-600 mb-1">{fish.englishName}</p>
              <p className="text-gray-600 mb-2">{fish.indonesianName}</p>
              {isLoggedIn && (
                <div className="flex justify-between mt-4">
                  <Link
                    href={`/edit/${fish.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition duration-300 ease-in-out"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(fish.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-5 text-center text-xl text-gray-600">
          No species found.
        </p>
      )}
    </div>
  );
}
