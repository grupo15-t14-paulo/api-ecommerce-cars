import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Image } from "../../entities";
import { IImage, IImageReturn } from "../../interfaces/image.interfaces";
import { imageReturnSchema } from "../../schemas/image.schema";

export const updateImageService = async (
  imgData: IImage,
  id: string
): Promise<IImageReturn> => {
  const imgRepository: Repository<Image> = AppDataSource.getRepository(Image);

  const foundImage: Image | null = await imgRepository.findOneBy({
    id,
  });

  const image = imgRepository.create({
    ...foundImage,
    ...imgData,
  });
  await imgRepository.save(image);

  const updatedImg = imageReturnSchema.parse(image);

  return updatedImg;
};
