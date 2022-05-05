import faker from "@faker-js/faker";

faker.seed(123);

export const ITEMS = new Array(50).fill().map((_, id) => ({
  id: id,
  text: faker.lorem.words()
}));
