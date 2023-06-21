import axios from "axios";

export const fetchBreeds = async () => {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    return console.log(error);
  }
};

export const fetchBreedImages = async (selectedBreedId) => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=100&breed_id=${selectedBreedId}`
    );
    return response.data;
  } catch (error) {
    return console.log(error);
  }
};

export const fetchBreedDetails = async (breedId) => {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/breeds/${breedId}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error al obtener los detalles de la raza de gato:", error);
    return {};
  }
};
const apiCalls = { fetchBreeds, fetchBreedImages, fetchBreedDetails };
export default apiCalls;
