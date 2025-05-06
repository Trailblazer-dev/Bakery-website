import { Facebook, Instagram, Linkedin } from "lucide-react";
import heroImage from "../assets/hero.png";
import servImage from "../assets/serv1.png";
import servImage2 from "../assets/serv2.png";
import servImage3 from "../assets/serv3.png";
import shopImage from "../assets/shop1.png";
import shopImag2 from "../assets/shop2.png";
import shopImag3 from "../assets/shop3.png";
import blogImage from "../assets/blog1.png";
import blogImage2 from "../assets/blog2.png";
import blogImage3 from "../assets/blog3.png";
import custImage from "../assets/cust1.png";
import custImage2 from "../assets/cust2.png";

// Fix the import to use type import syntax
import type { Product } from "../types/products";

export const navbar = [
    {id:1,
        title:"Home",
        href:"#hero"
    },
    {
        id:2,
        title:"Services",
        href:"#services"
    },
    {
        id:3,
        title:"Shop",
        href:"#shop"
    },
    {
        id:4,
        title:"Blog",
        href:"#blog"
    }
] ;

export const hero = {
  title: "Sweet moments, freshly baked with love",
  subtitle:
    "Customized cakes, treats and every thing sweet for all your special moments.",
  btn: "Shop Now",
  socials: [
    { id: 1, icon: Facebook, href: "https://www.facebook.com/yourpage" },
    {
      id: 2,
      icon:Linkedin,
      href: "https://www.linkedin.com/in/yourprofile",
    },
    {
      id: 3,
      icon: Instagram,
      href: "https://www.instagram.com/yourpage",
    },
  ],
  image:heroImage
};


// services 
export const services = {
  title: "OUR FINE HOME MADE CHOCOLATES",
  btn: {
    txt: "See Collection",
    href: "#shop",
  },
  list: [
    {
      image: servImage,
      desc: "There are some redeming factors in greeking text",
    },
    {
      image: servImage2,
      desc: "There are some redeming factors in greeking text",
    },
    {
      image: servImage3,
      desc: "There are some redeming factors in greeking text",
    },
  ],
};

// Sample products
export const products: Product[] = [
  {
    id: "product-1",
    image: shopImage,
    title: "3-tier Red Velvet Cake",
    subtitle: "Delicious red velvet cake with cream cheese frosting",
    price: 750,
    formattedPrice: "750 KSH",
    category: "cake",
    featured: true,
    inStock: true,
    description: "Our signature red velvet cake is made with premium cocoa powder and topped with smooth cream cheese frosting. Perfect for birthdays and special celebrations.",
    ingredients: ["Flour", "Cocoa powder", "Buttermilk", "Cream cheese", "Butter", "Sugar"]
  },
  {
    id: "product-2",
    image: shopImag2,
    title: "Chocolate Truffle Cake",
    subtitle: "Rich chocolate cake with ganache frosting",
    price: 850,
    formattedPrice: "850 KSH",
    category: "cake",
    featured: true,
    inStock: true,
    description: "A chocolate lover's dream! This decadent chocolate truffle cake features layers of moist chocolate sponge with rich chocolate ganache.",
    ingredients: ["Dark chocolate", "Flour", "Eggs", "Heavy cream", "Butter", "Sugar"]
  },
  {
    id: "product-3",
    image: shopImag3,
    title: "Vanilla Bean Cupcakes",
    subtitle: "Light and fluffy vanilla cupcakes",
    price: 200,
    formattedPrice: "200 KSH",
    category: "pastry",
    featured: true,
    inStock: true,
    description: "Our vanilla bean cupcakes are light, fluffy and bursting with natural vanilla flavor. Each cupcake is topped with a swirl of vanilla buttercream.",
    ingredients: ["Flour", "Vanilla beans", "Eggs", "Milk", "Butter", "Sugar"]
  },
];

//shop
export const shop = {
  title: "OUR BEST SELLERS",
  collection: [
    {
      id: "product-1",
      image: shopImage,
      title: "3-tier red velvet cake",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      price: 750,
      formattedPrice:"750 KSH",
      category: "cake",
      featured: true,
      inStock: true,
      description: "Our signature red velvet cake is made with premium cocoa powder and topped with smooth cream cheese frosting.",
      btntxt:"Add to cart",
    },
    {
      id: "product-2",
      image: shopImag2,
      title: "3-tier red velvet cake",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      price: 750,
      formattedPrice:"750 KSH",
      category: "cake",
      featured: true,
      inStock: true,
      description: "Our signature red velvet cake is made with premium cocoa powder and topped with smooth cream cheese frosting.",
      btntxt:"Add to cart",
    },
    {
      id: "product-3",
      image: shopImag3,
      title: "3-tier red velvet cake",
      subtitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      price: 750,
      formattedPrice:"750 KSH",
      category: "cake",
      featured: true, 
      inStock: true,
      description: "Our signature red velvet cake is made with premium cocoa powder and topped with smooth cream cheese frosting.",
      btntxt:"Add to cart",
    }
  ] as Product[],
  btntxt: "See All",
};

//blog
export const blog = [
  {
    title: "How to make perfect cakes at home",
    image: blogImage,
    date: "21 March",
  },
  {
    title: "How to make perfect cakes at home",
    image: blogImage2,
    date: "21 March",
  },
  {
    title: "How to make perfect cakes at home",
    image:blogImage3,
    date:"21 March"
  }
];

export const customer = {
  title: "OUR CUSTOMERS",
  users: [
    {
      image: custImage,
      name: "Bianka P.",
      location: "Bratislava, Slovakia",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    },
    {
      image: custImage2,
      name: "Jakub S.",
      location: "Bratislava, Slovakia",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    },
  ],
};