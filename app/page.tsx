import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from '@/components';
import Image from 'next/image';
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';

interface HomeProps {
  searchParams?: {
    manufacturer?: string;
    model?: string;
    fuel?: string;
    limit?: number;
    year?: number;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const allCars = await fetchCars({
    manufacturer: searchParams?.manufacturer || '',
    model: searchParams?.model || '',
    fuel: searchParams?.fuel || '',
    limit: searchParams?.limit || 10,
    year: searchParams?.year || 2022,
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className='overflow-hidden'>
      <Hero />
      <div id='discover' className='mt-12 padding-x padding-y max-width'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car, i) => (
                <CarCard key={i} car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams?.limit || 10) / 10}
              isNext={(searchParams?.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, No Results!</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
