import faker from "@faker-js/faker";

faker.seed(12345);

export const ITEMS = new Array(1000).fill().map((_, id) => ({
  id: id,
  text: faker.lorem.word()
}));

export const ItemTypes = {
  ITEM: "ListItem"
};
