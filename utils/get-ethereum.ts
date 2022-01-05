declare let window: any;

export default function getEthereum() {
  let ethereum: any;
  if (typeof window !== "undefined") ethereum = window.ethereum;

  try {
    if (ethereum) {
      return ethereum;
    } else {
      console.log("Ethereum is not present");
    }
  } catch (error) {
    console.log(error);
  }
}
