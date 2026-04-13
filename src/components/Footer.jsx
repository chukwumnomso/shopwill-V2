import { IconSocial } from "./SocialIcon";

const footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <>
      <div className="font-[jost] px-4 md:flex justify-between gap-20 py-10 items-center md:px-20">
        <div className="md:w-[40%]">
          <h2 className="text-lg uppercase mb-4">newsletter</h2>
          <p className=" text-gray-500">
            Subscribe to our newsletter to receive updates on new arrivals
            discounts,sales + more.
          </p>
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent  px-4 py-2 my-4 w-full md:w-full "
          />
          <br />
          <button className="bg-black w-40 text-white py-2 px-4 hover:text-blue-300 transition-colors duration-300 cursor-pointer">
            Subscribe
          </button>
        </div>
        <div className="my-20">
          <h2>Follow Us</h2>
          <div className="flex flex-col justify-center gap-4 mt-4">
            <IconSocial
              name="facebook"
              className="text-2xl text-gray-500 hover:text-black cursor-pointer transition-colors duration-300"
            />
            <IconSocial
              name="twitter"
              className="text-2xl text-gray-500 hover:text-black cursor-pointer transition-colors duration-300"
            />
            <IconSocial
              name="instagram"
              className="text-2xl text-gray-500 hover:text-black cursor-pointer transition-colors duration-300"
            />
            <IconSocial
              name="linkedin"
              className="text-2xl text-gray-500 hover:text-black cursor-pointer transition-colors duration-300"
            />
          </div>
        </div>
        <div>
          <h2 className="uppercase mt-20">footer menu</h2>
          <ul className="mt-4 flex flex-col gap-4">
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors duration-300">
              Home
            </li>
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors duration-300">
              About Us
            </li>
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors duration-300">
              Contact/ Find a store
            </li>
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors duration-300">
              Shipping & Returns
            </li>
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors duration-300">
              Privacy Policy
            </li>
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors duration-300">
              Terms & Conditions
            </li>
            <li className="text-gray-500 hover:text-black cursor-pointer transition-colors duration-300">
              FAQs
            </li>
          </ul>
        </div>
      </div>
      <div className="text-[0.9rem] font-[jost] bg-black text-white flex items-center justify-center h-10">
        &copy; {year} Shopwill Lifestyle Brand
      </div>
    </>
  );
};

export default footer;
