import { gql, useQuery } from "@apollo/client";
import CustomError from "components/CustomError";
import Loader from "components/Loader";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const getAssets = gql`
  query GetAssets($input: GetAssetsInput!) {
    assets(input: $input) {
      tokenId
      tokenAddress
      name
      description
      imageUrl
      imagePreviewUrl
    }
  }
`;

export type AssetType = {
  name: string;
  description: string;
  imageUrl: string;
  imagePreviewUrl: string;
  tokenAddress: string;
  tokenId: string;
};

type Data = {
  assets: AssetType[];
};

export default function Assets() {
  const { query } = useRouter();
  const { assets: tokenAddress } = query;

  const { loading, error, data } = useQuery<Data>(getAssets, {
    variables: {
      input: {
        owner: tokenAddress,
      },
    },
  });

  if (error) return <CustomError error={error} />;
  if (loading ?? !data) return <Loader />;

  const { assets } = data;

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {assets.map(
            (
              { name, imageUrl, imagePreviewUrl, tokenId, tokenAddress },
              key
            ) => (
              <Link key={key} href={`${tokenAddress}/${tokenId}`}>
                <a className="group">
                  <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={imagePreviewUrl}
                      // alt={product.imageAlt}
                      className="w-full h-full object-center object-cover group-hover:opacity-75"
                    />
                  </div>
                  <div>
                    <div>
                      <h3 className="mt-4 text-sm text-gray-700">{name}</h3>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {/* {product.price} */}test
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {},
  };
}
