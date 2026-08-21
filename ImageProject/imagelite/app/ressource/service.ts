import { image } from './image';

class ImageService {
  baseURL: string = 'http://localhost:8080/images';

  async buscar(): Promise<image[]> {
    const response = await fetch(this.baseURL);
    return await response.json();
  }

}
  export const useImage = () => new ImageService();