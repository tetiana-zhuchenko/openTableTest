import Header from './components/Header'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fetchRestaurantsByCity = (city: string | undefined) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
  }

  if (!city) return prisma.restaurant.findMany({ select })
  return prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city.toLocaleLowerCase(),
        },
      },
    },
    select,
  })
}

export default async function Search({
  searchParams,
}: {
  searchParams: { city: string }
}) {
  const restaurants = await fetchRestaurantsByCity(searchParams.city)
  console.log({ restaurants })
  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar />
        <div className="w-5/6">
          {restaurants.length ? (
            <RestaurantCard />
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  )
}
