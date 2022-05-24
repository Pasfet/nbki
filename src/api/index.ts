import { TableItemInterface } from "@/types/table";

const randomName = () => {
  const words =
    "абвгдеёжзийклмнопрстуфхцчшщъыьэюЯАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
  const wordsLength = words.length;
  let result = "";

  for (let i = 0; i < 5; i++) {
    result += words.charAt(Math.floor(Math.random() * wordsLength));
  }

  return result;
};
const randomPrice = (min: number, max: number) =>
  (Math.random() * (max - min) + min).toFixed(2);

export const generateData = (id: number): TableItemInterface => {
  const name = randomName();
  const price = randomPrice(0.01, 1000.0);
  const count = randomPrice(1, 100);
  const total = (+price * +count).toFixed(2);

  return {
    id,
    name,
    price,
    count,
    total,
  };
};

export const mockResponseData = (
  count: number,
  delay = 500
): Promise<TableItemInterface[]> => {
  const result: TableItemInterface[] = [];

  for (let i = 0; i < count; i++) {
    result.push(generateData(++i));
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(result), delay);
  });
};
