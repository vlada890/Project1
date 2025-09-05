"use client";
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react';
import { CustomFilterProps } from '@/types';
import { updateSearchParams } from '@/utils';

const CustomFilter = ({ title }: CustomFilterProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState(getFilterOptions(title)[0]);

  const handleUpdateParams = (e: { title: string, value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPathName);
  };

  return (
    <div className="w-fit">
      <Listbox 
        value={selected} 
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        <div className="relative w-fit z-10">
          <Listbox.Button className="custom-filter__btn">
            <span className="block truncate">{selected.title}</span>
            <Image 
              src="/chevron-up-down.svg" 
              width={20} 
              height={20} 
              className="ml-4 object-contain" 
              alt="chevron up down" 
            />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="custom-filter__options">
              {getFilterOptions(title).map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) => 
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

function getFilterOptions(title: string) {
  switch (title) {
    case 'type':
      return [
        { title: "Job Type", value: "" },
        { title: "Full-time", value: "full-time" },
        { title: "Part-time", value: "part-time" },
        { title: "Contract", value: "contract" },
        { title: "Freelance", value: "freelance" },
        { title: "Internship", value: "internship" },
      ];
    case 'level':
      return [
        { title: "Experience Level", value: "" },
        { title: "Entry Level", value: "entry" },
        { title: "Mid Level", value: "mid" },
        { title: "Senior Level", value: "senior" },
        { title: "Executive", value: "executive" },
      ];
    default:
      return [{ title: "Filter", value: "" }];
  }
}

export default CustomFilter
