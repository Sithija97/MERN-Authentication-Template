import { Container } from "../components";

export const Home = () => {
  return (
    <div className="pt-20 pb-28 -mt-28 px-20 w-full bg-white">
      <div className=" m-auto flex flex-col gap-5">
        <div className="flex flex-col items-center justify-center">
          <p className="leading-none text-6xl font-extrabold text-gray-900 ">
            Decentralized for a
          </p>
          <p className="leading-none text-6xl font-extrabold text-gray-900 ">
            better tomorrow
          </p>
          <p className="leading-6 text-gray-500 mt-6 font-medium">
            Buy, trade, and hold{" "}
            <span className="text-gray-700 font-bold">600+</span>{" "}
            cryptocurrencies on Flowbite
          </p>
        </div>
        <div className="grid grid-cols-5 gap-12">
          <Container
            bgColor="bg-blue-100"
            title="$76 billion"
            titleColor="text-blue-700"
            subtitle="24h trading volume"
            subtitleColor="text-blue-500"
          />
          <Container
            bgColor="bg-teal-100"
            title="600+"
            titleColor="text-teal-600"
            subtitle="Cryptocurrencies listed"
            subtitleColor="text-teal-500"
          />
          <Container
            bgColor="bg-indigo-100"
            title="34M"
            titleColor="text-indigo-700"
            subtitle="Fully diluted market cap"
            subtitleColor="text-indigo-500"
          />
          <Container
            bgColor="bg-purple-100"
            title="90 million"
            titleColor="text-purple-700"
            subtitle="Registered users"
            subtitleColor="text-purple-500"
          />
          <Container
            bgColor="bg-green-100"
            title="0.10%"
            titleColor="text-green-600"
            subtitle="Lowest transaction fees"
            subtitleColor="text-green-500"
          />
        </div>
      </div>
    </div>
  );
};
