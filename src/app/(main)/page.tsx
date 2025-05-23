import useAxios from "@/hooks/useAxios";
import BecomeVendor from "@/sections/home/become-vendor";
import CategorySection from "@/sections/home/category-section";
import PopularServices from "@/sections/home/popular-services";
import Setter from "@/sections/home/setter";
import TopBanner from "@/sections/home/top-banner";
import TopRatedVendors from "@/sections/home/top-rated-vendors";
import TrendingProducts from "@/sections/home/trending-products";
import { headers } from 'next/headers';

export default async function Home() {
  headers();

  const request = useAxios();

  try {
    const response = await request({
      method: 'get',
      url: '/api/home', // Change this to your actual API endpoint
      params: {
        prodLimit: 8,
        servLimit: 8,
        storeLimit: 3
      }
    });

    return (
      <>
        <TopBanner />
        <CategorySection />
        <TrendingProducts />
        <BecomeVendor />
        <PopularServices />
        <TopRatedVendors stores={response?.data?.stores || []} />
        <Setter
          categories={response?.data?.categories || []}
          products={response?.data?.products || []}
          services={response?.data?.services || []}
        />
      </>
    );
  } catch (error) {
    console.error('Failed to fetch data:', error);
    // Fallback UI in case of error
    return (
      <>
        <TopBanner />
        <CategorySection />
        <TrendingProducts />
        <BecomeVendor />
        <PopularServices />
      </>
    );
  }
}
