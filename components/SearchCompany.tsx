"use client";
import { useState, Fragment } from 'react';
import Image from "next/image";
import { Combobox, Transition } from '@headlessui/react';
import { SearchCompanyProps } from '@/types';
import { companies } from '@/constants';

const SearchCompany = ({ company, setCompany }: SearchCompanyProps) => {
  const [query, setQuery] = useState('');

  const filteredCompanies = 
    query === "" 
      ? companies 
      : companies.filter((item) => 
          item.toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-company">
      <Combobox value={company} onChange={setCompany}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src='/company-logo.svg'
              width={20}
              height={20}
              className='ml-4'
              alt='company logo'
            />
          </Combobox.Button>

          <Combobox.Input
            className="search-company__input"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Google"
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10"
              static
            >
              {filteredCompanies.length === 0 && query !== "" ? (
                <Combobox.Option
                  className="relative cursor-default select-none py-2 pl-10 pr-4"
                  value={query}
                >
                  Create "{query}"
                </Combobox.Option>
              ) : (
                filteredCompanies.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-company__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>

                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-primary-blue"
                            }`}
                          >
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchCompany
