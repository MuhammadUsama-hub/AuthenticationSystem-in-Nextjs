"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isLogout, setIsLogout] = useState(false);
  const [isLogedIn, setIsloggedin] = useState(false);
  console.log(token);
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logut Successfully");
      setIsLogout(true);
      setIsloggedin(false);
      router.push("/");
    } catch (error: any) {
      console.log("Something Went Wrong" + error.message);
    }
  };
  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
    console.log(tokenCookie);
    if (tokenCookie) {
      const tokenValue = tokenCookie.split("=")[1];
      console.log(tokenValue);
      setToken(tokenValue);
    }
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      setIsloggedin(true);
      setIsLogout(false);
    } else {
      setIsloggedin(false);
      setIsLogout(true);
    }
  }, [token]);
  return (
    <>
      <header className="bg-white dark:bg-gray-900">
        <nav className="bg-gray-900 shadow flex flex-row  ">
          <div className="container flex items-center justify-center p-6 mx-auto text-gray-200 capitalize dark:text-gray-300">
            <Link
              href="/"
              className="text-gray-300 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-white-500 mx-1.5 sm:mx-6"
            >
              home
            </Link>

            <Link
              href="#"
              className="border-b-2 border-transparent hover:text-gray-400 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-white mx-1.5 sm:mx-6"
            >
              policy
            </Link>

            <Link
              href="#"
              className="border-b-2 border-transparent hover:text-gray-400 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-white mx-1.5 sm:mx-6"
            >
              customize
            </Link>

            <Link
              href="/profile"
              className="border-b-2 border-transparent hover:text-gray-400 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-white mx-1.5 sm:mx-6"
            >
              profile
            </Link>

            {/* <Link href="#" className="border-b-2 border-transparent hover:text-gray-400 transition-colors duration-300 transform dark:hover:text-gray-200  mx-1.5 sm:mx-6">
            
        </Link> */}

            <Link
              href="#"
              className="border-b-2 border-transparent hover:text-gray-400 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-white mx-1.5 sm:mx-6"
            >
              contact
            </Link>
          </div>
          {isLogout && (
            <div className="flex flex-row text-white justify-center items-center w-35 ">
              <Link
                href="/login"
                className="bg-green-500 px-6 hover:bg-green-400 rounded transition-colors duration-300 transform dark:hover:text-gray-200  "
              >
                login
              </Link>
              <Link
                href="/signup"
                className=" hover:text-gray-400 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-white mx-1 sm:mx-6"
              >
                signUp
              </Link>
            </div>
          )}

          {isLogedIn && (
            <div className="flex flex-row text-white justify-center items-center w-35 ">
              <button
                onClick={onLogout}
                className="flex flex-row  hover:text-gray-400 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-white mx-1 sm:mx-6"
              >
                Logout
                <Icon.BoxArrowInRight className="text-gray-300 font-bold text-2xl" />
              </button>
            </div>
          )}
        </nav>
        {/* nav End */}
        <div className="container flex flex-col px-6 py-4 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
          <div className="flex flex-col items-center w-full lg:flex-row lg:w-1/2">
            {/* <div className="flex justify-center order-2 mt-6 lg:mt-0 lg:space-y-3 lg:flex-col">
                <button className="w-3 h-3 mx-2 bg-blue-500 rounded-full lg:mx-0 focus:outline-none"></button>
                <button className="w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500"></button>
                <button className="w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500"></button>
                <button className="w-3 h-3 mx-2 bg-gray-300 rounded-full lg:mx-0 focus:outline-none hover:bg-blue-500"></button>
            </div> */}

            <div className="max-w-lg lg:mx-12 lg:order-2">
              <h1 className="text-3xl font-semibold tracking-wide text-gray-800 dark:text-white lg:text-4xl">
                Crafting Sustainable Elegance
              </h1>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                <span className="font-semibold">
                  Looking for top-quality, sustainable packaging?
                </span>{" "}
                Our premium kraft products are designed with you in mind.
                Whether you need chic paper bags, refined envelopes, sturdy
                boxes, or bespoke cards, we have the perfect solution. As your
                one-stop packaging provider, we offer eco-friendly materials and
                fully customizable designs. Choose us for stylish, sustainable
                packaging that stands out.
              </p>
              <div className="mt-6">
                <button className=" bg-green-500 px-6 py-2.5 mt-6 text-sm font-medium leading-5 text-center text-white capitalize rounded-lg hover:bg-green-400 lg:mx-0 lg:w-auto focus:outline-none flex flex-row">
                  Shop More{" "}
                  <Icon.ArrowRightShort className="text-white  text-xl" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
            <img
              className="object-cover w-full h-full max-w-2xl rounded-md"
              src="/MainHerocover.jpg"
              alt="apple watch photo"
            />
          </div>
        </div>
      </header>
      {/* top Products */}

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="text-2xl md:text-5xl text-grag-800 mb-8">
            Feature Products
          </h1>
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="/Giftbox.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Boxes
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Small Gift Boxes
                </h2>
                <p className="mt-1">Rs 499</p>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="/smallBox.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Boxes
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Small Multipurpose Sweets Boxes
                </h2>
                <p className="mt-1">Rs 399</p>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="/paperbag.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Bags
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Medium food Grade Paper bags
                </h2>
                <p className="mt-1">Rs 599</p>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="/thankucard.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Cards
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Flower Pattern Greeting Cards
                </h2>
                <p className="mt-1">Rs 333</p>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="/Giftbox.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Boxes
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Small Gift Boxes
                </h2>
                <p className="mt-1">Rs 499</p>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="/smallBox.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Boxes
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Small Multipurpose Sweets Boxes
                </h2>
                <p className="mt-1">Rs 399</p>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="/paperbag.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Bags
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Medium food Grade Paper bags
                </h2>
                <p className="mt-1">Rs 599</p>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="/thankucard.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Cards
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Flower Pattern Greeting Cards
                </h2>
                <p className="mt-1">Rs 333</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand promise */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Unmatched Quality, Sustainable Innovation, and Creative Excellence
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              At Emon, we are dedicated to providing top-tier kraft products
              that marry exceptional quality with eco-friendly practices and
              innovative designs.{" "}
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-green-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-green-200 text-green-500 mb-5 flex-shrink-0">
                <Icon.ClipboardCheck className="text-green text-4xl font-bold" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Product Quality
                </h2>
                <p className="leading-relaxed text-base">
                  Our products are crafted with meticulous attention to detail,
                  ensuring premium quality that stands out. From durable
                  materials to elegant designs, we deliver excellence in every
                  piece.
                </p>
                {/* <a className="mt-3 text-green-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a> */}
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-green-200 text-green-500 mb-5 flex-shrink-0">
                <Icon.CreditCard2Back className="text-green text-4xl font-bold" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Secure Payments
                </h2>
                <p className="leading-relaxed text-base">
                  Shop with confidence knowing that our secure payment system
                  protects your transactions. We prioritize your privacy and
                  security, making your purchasing experience smooth and
                  worry-free.
                </p>
                {/* <a className="mt-3 text-green-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a> */}
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-green-200 text-green-500 mb-5 flex-shrink-0">
                <Icon.Truck className="text-green text-4xl font-bold" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  On-Time Delivery
                </h2>
                <p className="leading-relaxed text-base">
                  We understand the importance of timely deliveries. Our
                  efficient logistics ensure that your orders arrive on
                  schedule, every time, so you can plan with peace of mind.
                </p>
                {/* <a className="mt-3 text-green-500 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a> */}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center ">
            <button className=" bg-green-500 px-6 py-2.5 mt-6 text-sm font-medium leading-5 text-center text-white capitalize rounded-lg hover:bg-green-400 lg:mx-0 lg:w-auto focus:outline-none flex flex-row">
              Shop More <Icon.ArrowRightShort className="text-white  text-xl" />
            </button>
          </div>
        </div>
      </section>
      {/* footer */}
      <footer className="bg-gray-900  body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl">Emon</span>
            </a>
            <p className="mt-2 text-sm text-gray-500">
              Your On Stop Packing Solution!
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-300">
                    Greeting Cards
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-300">
                    Customize Packing
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-300">Branding</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-300">Wrapping</a>
                </li>
              </nav>
            </div>
            {/* <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div> */}
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Importants
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-600 hover:text-gray-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-300">Policies</a>
                </li>
                <li>
                  <a className="text-gray-600 hover:text-gray-300">
                    Track Orders
                  </a>
                </li>
                {/* <li>
                  <a className="text-gray-600 hover:text-gray-800">
                    Fourth Link
                  </a>
                </li> */}
              </nav>
            </div>
          </div>
        </div>
        {/* footer */}
        <div className="bg-gray-900">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2024 Emon —
              <a
                href="https://twitter.com/knyttneve"
                rel="noopener noreferrer"
                className="text-gray-500 ml-1"
                target="_blank"
              >
                @O'mama WebSolutions
              </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-gray-500 hover:text-gray-300">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500 hover:text-gray-300">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500 hover:text-gray-300">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500 hover:text-gray-300">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx="4" cy="4" r="2" stroke="none"></circle>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
