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

export async function fetchDogBreeds() {
  try {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds");
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchDogPhotos(breed) {
  try {
    const response = await axios.get(`https://api.thedogapi.com/v1/images/search?breed=${breed}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchCatBreeds() {
  try {
    const response = await axios.get("https://api.theCatapi.com/v1/breeds");
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const apiCalls = { fetchBreeds, fetchBreedImages, fetchBreedDetails };
export default apiCalls;
