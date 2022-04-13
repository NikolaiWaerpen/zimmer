import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "components/Alert";
import Insights from "components/bot/Insights";
import AddressForm from "components/bot/Insights/AddressForm";
import { useState } from "react";

export default function Bot() {
  const [addresses, setAddresses] = useState<string[]>([]);

  return (
    <div className="pt-8 space-y-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Bot trades</h1>
          <p className="mt-2 text-sm text-gray-700">All trades by bots</p>
        </div>
      </div>

      <AddressForm setAddresses={setAddresses} />

      {addresses.length > 0 && (
        <fieldset className="border-t border-b border-gray-200">
          <legend className="sr-only">Addresses</legend>
          <div className="divide-y divide-gray-200">
            {addresses.map((address, idx) => (
              <div className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-700 ml-4"
                  >
                    {address}
                  </label>
                </div>
                <button
                  className="ml-3 mr-4 flex items-center h-5"
                  onClick={() => {
                    let newAddresses = [...addresses];
                    newAddresses.splice(idx, 1);
                    setAddresses(newAddresses);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} className="text-theme-4" />
                </button>
              </div>
            ))}
          </div>
        </fieldset>
      )}

      {addresses.length > 0 ? (
        <Insights addresses={addresses} />
      ) : (
        <div className="h-[72rem] flex justify-center">
          <div className="mt-48">
            <Alert
              state="warning"
              title="Input a wallet address to get trading performance insights"
            />
          </div>
        </div>
      )}
    </div>
  );
}
