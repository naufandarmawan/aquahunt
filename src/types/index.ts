export interface Species {
  id: string;
  faoCode: string;
  typeOfFish: string;
  scientificName: string;
  englishName: string;
  indonesianName: string;
  localName: string;
  typeOfWater: string;
  imageUrl: string | null;
  statusInIndonesia: string;
  fishUtilization: string;
}

export interface SpeciesResponse {
  data: Species[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}
