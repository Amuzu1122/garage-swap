import type { Item } from "../Types/info";

const items: Item[] = [
  {
    id: 1,
    title: "Vintage Record Player",
    price: 120.0,
    description:
      "An old violin I got as a gift from my grandpa, it has been with me for 20 years and I finally think its time to let it go",
    is_free: false,
    image: "/vintage-record-player.jpg",
    status: "available",
    badge: "FIXED PRICE",
    category: { id: 1, name: "Electronics" },
    owner: { id: 1, username: "jake99" },
  },
  {
    id: 2,
    title: "Mountain Bike",
    price: 250.0,
    description: "An original mountain bike by Santa Cruz, I have used it for about 3 years and its in good condition however, the bike feels wobbly to use and will need some retouching to make it look and function well.",
    is_free: false,
    image: "/mountain-bike.jpg",
    status: "available",
    badge: "BIDDING",
    category: { id: 2, name: "Sports" },
    owner: { id: 2, username: "sara_m" },
  },
  {
    id: 3,
    title: "Mid-Century Lamp",
    price: 0,
    is_free: true,
    image: "/mid-century-lamp.jpg",
    description: "This lamp was first owned by my late mother in 1992, but things have gotten pretty hard for me right now. It functions like its new and its a mid century lamp used in england back in the 1900s",
    status: "available",
    badge: "FREE",
    category: { id: 3, name: "Furniture" },
    owner: { id: 3, username: "tomk" },
  },
  {
    id: 4,
    title: "Children's Book Set",
    price: 15.0,
    is_free: false,
    image: "/children-book-set.jpg",
    status: "available",
    description: "I got these books for my daughter back when she was young but we have no use for them now so I'm planning on selling them. If interested, hit me up; they are good books",
    badge: "FIXED PRICE",
    category: { id: 4, name: "Books" },
    owner: { id: 4, username: "mia_r" },
  },
];

export default items;