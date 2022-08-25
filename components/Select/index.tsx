import { Fragment, useEffect, useMemo, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import classNames from "classnames";

export type SelectOptionType = {
  id: number;
  value: string;
};

type SelectPropsType = {
  label?: string;
  description?: string;
  required?: boolean;
  error?: string | undefined;
  options: string[];
  onChange: (value: string) => void;
  value: string;
};

export default function Select({
  label,
  description,
  options,
  required,
  error,
  onChange,
  value,
}: SelectPropsType) {
  const formattedOptions: SelectOptionType[] = useMemo(
    () =>
      options.map((option, idx) => ({
        id: idx + 1,
        value: option,
      })),
    [options]
  );

  const initialSelectedOption = formattedOptions.find(
    ({ value: optionValue }) => optionValue === value
  );

  const [selectedOption, setSelectedOption] = useState(
    initialSelectedOption ? initialSelectedOption : formattedOptions[1]
  );

  function onSelectOption(value: SelectOptionType) {
    onChange(value.value);
    setSelectedOption(value);
  }

  useEffect(() => {
    if (!value) onChange(selectedOption.value);
  }, [value]);

  return (
    <div className="relative mb-0.5">
      <Listbox
        value={selectedOption}
        onChange={(value) => onSelectOption(value)}
      >
        {({ open }) => (
          <div className="relative">
            <Listbox.Label className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900 z-[100000000000]">
              {label}
            </Listbox.Label>
            {description && <p>{description}</p>}
            <div className="mt-1 relative">
              <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-theme-4 focus:border-theme-4 sm:text-sm">
                <span className="block truncate">{selectedOption.value}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-[1000000000] mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {formattedOptions.map((option) => {
                    const { id, value } = option;

                    return (
                      <Listbox.Option
                        key={id}
                        className={({ active }) =>
                          classNames(
                            active ? "text-white bg-theme-4" : "text-gray-900",
                            "cursor-default select-none relative py-2 pl-3 pr-9"
                          )
                        }
                        value={option}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {value}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-theme-4",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
      {error && (
        <p className="absolute right-0 text-xs text-red-500 text-right">
          {error}
        </p>
      )}
    </div>
  );
}
