"use client";
import { useState } from 'react';
import Image from 'next/image';
import { JobCardProps } from '@/types';
import CustomButton from './CustomButton';

const JobCard = ({ job }: JobCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { title, company, location, salary, type, level, description, posted_at } = job;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 group hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-start gap-2">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-black capitalize">
              {title}
            </h2>
            <p className="text-lg font-medium text-gray-600 mt-1">
              {company}
            </p>
          </div>
          
          <div className="flex flex-col items-end text-right">
            <p className="text-lg font-bold text-green-600">
              {salary ? `$${salary}` : 'Salary TBD'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {type}
            </p>
          </div>
        </div>

        <div className="relative w-full h-40 my-4 object-contain bg-gray-100 rounded-lg flex items-center justify-center">
          <Image 
            src="/job-placeholder.svg" 
            alt="job" 
            width={120} 
            height={90} 
            className="object-contain opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-10"></div>
        </div>

        <div className="relative flex w-full mt-2">
          <div className="flex group-hover:invisible w-full justify-between text-grey">
            <div className="flex flex-col justify-center items-center gap-1">
              <Image src="/location.svg" width={20} height={20} alt="location" />
              <p className="text-sm">{location}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <Image src="/level.svg" width={20} height={20} alt="level" />
              <p className="text-sm">{level}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <Image src="/calendar.svg" width={20} height={20} alt="posted" />
              <p className="text-sm">{posted_at}</p>
            </div>
          </div>

          <div className="job-card__btn-container">
            <CustomButton
              title="View Details"
              containerStyles="w-full py-4 rounded-full bg-primary-blue"
              textStyles="text-white text-sm leading-4 font-semibold"
              rightIcon="/right-arrow.svg"
              handleClick={() => setIsOpen(true)}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-black">{title}</h3>
                  <p className="text-lg text-gray-600">{company}</p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Image src="/close.svg" width={20} height={20} alt="close" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800">Location:</h4>
                  <p className="text-gray-600">{location}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800">Job Type:</h4>
                  <p className="text-gray-600">{type}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800">Experience Level:</h4>
                  <p className="text-gray-600">{level}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800">Salary:</h4>
                  <p className="text-gray-600">{salary ? `$${salary}` : 'To be discussed'}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800">Description:</h4>
                  <p className="text-gray-600">{description || 'No description available'}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <CustomButton
                  title="Apply Now"
                  containerStyles="flex-1 bg-green-600 text-white rounded-full py-3"
                  handleClick={() => {}}
                />
                <CustomButton
                  title="Save Job"
                  containerStyles="flex-1 bg-gray-200 text-gray-800 rounded-full py-3"
                  handleClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobCard
