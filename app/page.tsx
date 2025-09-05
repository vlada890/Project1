import Image from 'next/image';
import Hero from '@/components/Hero';
import CustomFilter from '@/components/CustomFilter';
import { SearchBar, JobCard } from '@/components';
import { fetchJobs } from '@/utils';

export default async function Home() {
  const allJobs = await fetchJobs();
  const isDataEmpty = !Array.isArray(allJobs) || allJobs.length < 1 || !allJobs;
  
  return (
    <main className='overflow-hidden'>
      <Hero />
      
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Job Listings</h1>
          <p>Explore job opportunities you might like</p>
        </div>
        
        <div className='home__filters'>
          <SearchBar />
          
          <div className='home__filter-container'>
            <CustomFilter title='type' />
            <CustomFilter title='level' />
          </div>
        </div>
        
      {!isDataEmpty ? (
        <section>
          <div className='home__jobs-wrapper'>
            {allJobs.map((job, index) => (
              <JobCard key={index} job={job}/> 
            ))}
          </div>
        </section>
      ) : (
        <div className='home__error-container'>
          <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
          <p>No jobs found. Try adjusting your filters.</p>
        </div>
      )}

            </div>
          </main>
        );
      }
