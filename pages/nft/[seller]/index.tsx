/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

import { gql, useQuery } from "@apollo/client";
import CustomError from "components/CustomError";
import Loader from "components/Loader";
import { seaport } from "lib/seaport";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  // More products...
];

const getAsset = async () => {
  const tokenAddress = "0x09233d553058c2f42ba751c87816a8e9fae7ef10",
    tokenId = "4677";

  // const asset = await seaport.api.getAsset({
  //   tokenAddress,
  //   tokenId,
  // });
  // console.log(asset);

  const assets = await seaport.api.getAssets({
    owner: "0x9f24d0572b848a6771b441f5a58702c047f7556f",
    limit: 50,
  });
  console.log(assets);
  return assets;
};

const getAssets = gql`
  query GetAssets {
    assets {
      name
      description
      imageUrl
      imageUrlThumbnail
    }
  }
`;

type Asset = {
  name: string;
  description: string;
  imageUrl: string;
  imageUrlThumbnail: string;
};

type Data = {
  assets: Asset[];
};

export default function CUID() {
  const { loading, error, data } = useQuery<Data>(getAssets);

  if (error) return <CustomError error={error} />;
  if (loading ?? !data) return <Loader />;

  const { assets } = data;

  return (
    <div className="bg-white">
      <button onClick={() => getAsset()}>FETCH</button>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {assets.map(({ name, imageUrl }, key) => (
            <a key={key} href={name} className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={imageUrl}
                  // alt={product.imageAlt}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
              {/* <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price}
              </p> */}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
