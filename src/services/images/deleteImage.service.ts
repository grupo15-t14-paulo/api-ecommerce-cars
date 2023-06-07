import { Repository } from "typeorm";
import { Image } from "../../entities";
import { AppDataSource } from "../../data-source";

export const deleteImageService = async (id: string): Promise<void> => {
  const imgRepository: Repository<Image> = AppDataSource.getRepository(Image);

  const foundImage: Image | null = await imgRepository.findOneBy({
    id,
  });

  await imgRepository.remove(foundImage!);
};
