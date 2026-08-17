export type Product = {
  id: number
  name: string
  category: "office" | "tech" | "lifestyle"
  price: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "Standing Desk",
    category: "office",
    price: 12900,
  },
  {
    id: 2,
    name: "Desk Lamp",
    category: "office",
    price: 1290,
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    category: "tech",
    price: 3490,
  },
  {
    id: 4,
    name: "Wireless Mouse",
    category: "tech",
    price: 1590,
  },
  {
    id: 5,
    name: "USB-C Hub",
    category: "tech",
    price: 2190,
  },
  {
    id: 6,
    name: "Notebook Set",
    category: "lifestyle",
    price: 390,
  },
  {
    id: 7,
    name: "Travel Tumbler",
    category: "lifestyle",
    price: 790,
  },
  {
    id: 8,
    name: "Office Chair",
    category: "office",
    price: 7590,
  },
  {
    id: 9,
    name: "Web Camera",
    category: "tech",
    price: 2790,
  },
  {
    id: 10,
    name: "Canvas Bag",
    category: "lifestyle",
    price: 590,
  },
  {
    id: 11,
    name: "Monitor Stand",
    category: "office",
    price: 1890,
  },
  {
    id: 12,
    name: "Noise-canceling Headphones",
    category: "tech",
    price: 6490,
  },
]