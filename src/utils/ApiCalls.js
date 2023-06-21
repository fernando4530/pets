import axios from "axios";

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