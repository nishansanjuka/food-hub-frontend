import { Food } from "@/components/foods";
import { icons } from "lucide-react";

export interface RestuarantData {
  name: string;
  address: string;
}

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof icons;
  label?: string;
  description?: string;
}

export const Resturant: RestuarantData = {
  name: "CDK - Foods",
  address: `1234 Elm Street, Apartment 567
  Springfield, Anytown`,
};
export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: "Home",
    label: "Home",
  },
  {
    title: "Foods",
    href: "/foods",
    icon: "Utensils",
    label: "Foods",
  },
  {
    title: "Order",
    href: "/checkout-order",
    icon: "ReceiptText",
    label: "Dashboard",
  },
  {
    title: "You",
    href: "/you/personal-informations",
    icon: "User",
    label: "Dashboard",
  },
];

export const SettingCategories: any = [
  { name: "Personal", href: "/escort/dashboard/settings", current: true },
  {
    name: "Services",
    href: "/escort/dashboard/settings/services",
    current: false,
  },
  {
    name: "Contact",
    href: "/escort/dashboard/settings/contact",
    current: false,
  },
];

export const foods : Food[] = [
  {
    id: 1,
    name: "Vegitable Rice & Curry",
    href: "#",
    price: 1200,
    description: "A delicious cheesy pizza.",
    options: ["small" , "large"],
    imageSrc:
      "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?t=st=1711304390~exp=1711307990~hmac=ae11354b359b796b83266190d48dc3aa8c0e96184c35447ed8229446bcc3332a&w=826",
    imageAlt: "Image of Pizza",
    additionPrice : 250
    
  },
  {
    id: 2,
    name: "Burger",
    href: "#",
    price: 10.00,
    description: "A juicy and flavorful burger.",
    options: ["small"],
    imageSrc:
      "https://img.freepik.com/free-photo/delicious-burger-with-many-ingredients-isolated-white-background-tasty-cheeseburger-splash-sauce_90220-1266.jpg?t=st=1711304428~exp=1711308028~hmac=3bef6bdc8e49051c4c5d5b7c159941779f8eb46885baeb786f4059644153c091&w=826",
    imageAlt: "Image of Burger",
    additionPrice : 0
  },
  {
    id: 3,
    name: "Salad",
    href: "#",
    price: 8.75,
    description: "A healthy and refreshing salad.",
    options: ["small"],
    imageSrc:
      "https://img.freepik.com/free-photo/top-view-tasty-salad-with-vegetables_23-2148515491.jpg?t=st=1711304653~exp=1711308253~hmac=15ea2c40a802194e53e2d18e7238d907fd113922f19747998f0ebd50e98709ae&w=826",
    imageAlt: "Image of Salad",
    additionPrice : 0
  },
  {
    id: 4,
    name: "Pasta",
    href: "#",
    price: 15.25,
    description: "A hearty and comforting pasta dish.",
    options: ["small"],
    imageSrc:
      "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?t=st=1711304500~exp=1711308100~hmac=b77690195b33b975db0c2c66d0374fd0213d34099a370280c4e64f9c45c58b2d&w=826",
    imageAlt: "Image of Pasta",
    additionPrice : 0
  },
  {
    id: 5,
    name: "Soup",
    href: "#",
    price: 7.95,
    description: "A warm and satisfying soup.",
    options: ["small"],
    imageSrc:
      "https://img.freepik.com/free-photo/lentil-soup-with-mixed-ingredients-herbs-white-bowl-with-spoon_114579-3083.jpg?t=st=1711304528~exp=1711308128~hmac=b651ad22ea7fa513c4674b170cf305e9c7b2f057b03fc31beaefc86c99665829&w=1380",
    imageAlt: "Image of Soup",
    additionPrice : 0
  },
  {
    id: 6,
    name: "Sushi",
    href: "#",
    price: 18.99,
    description: "A delicious and healthy Japanese dish.",
    options: ["small"],
    imageSrc:
      "https://img.freepik.com/free-photo/buritto-with-french-fries-table_140725-4492.jpg?t=st=1711304731~exp=1711308331~hmac=ba0617c1457c83c3e2c4cf70f2bfb263f930ea4813498afab69cc5df26323e4c&w=826",
    imageAlt: "Image of Sushi",
    additionPrice : 0
  },
  {
    id: 7,
    name: "Burrito",
    href: "#",
    price: 11.50,
    description: "A normal and flavorful Mexican wrap.",
    options: ["small"],
    imageSrc:
      "https://img.freepik.com/free-photo/plastic-box-shushi-rolls-delivery-with-salmon-sauces-wasabi-ginger_140725-213.jpg?t=st=1711304708~exp=1711308308~hmac=893425e004eb83f9caff18258cb26d041200e023b88fa675527ed5a9f458a685&w=826",
    imageAlt: "Image of Burrito",
    additionPrice : 0
  },
  {
    id: 8,
    name: "Stir-fry",
    href: "#",
    price: 13.75,
    description: "A quick and easy Asian dish with vegetables and meat.",
    options: ["small"],
    imageSrc:
      "https://img.freepik.com/free-photo/fried-vegetables-with-sauce-pan_1220-5230.jpg?t=st=1711304780~exp=1711308380~hmac=0626b8dd104185ee773db6ba35f4cc47ed5e5ff76fb304c5f85fbbd78a5d8fc3&w=826",
    imageAlt: "Image of Stir-fry",
    additionPrice : 0
  },
  {
    id: 9,
    name: "Sandwich",
    href: "#",
    price: 8.25,
    description: "A classic and satisfying lunch option.",
    options: ["small"],
    imageSrc:
      "https://img.freepik.com/free-photo/side-view-shawarma-with-fried-potatoes-board-cookware_176474-3215.jpg?t=st=1711304803~exp=1711308403~hmac=ac1a0fdb6bb03cc5ec792152a39d2249dc24b9c148ebdd1634e4616d42130599&w=826",
    imageAlt: "Image of Sandwich",
    additionPrice : 0
  },
];
