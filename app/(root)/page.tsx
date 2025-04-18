import ProductList from "@/components/shared/product/product-list";
import { GetLatestProduct, getFeaturedProduct } from "@/lib/actions/product.actions";
import ProductCarousel from '@/components/shared/product/product-carousel'
import ViewAllProducts from "@/components/viewAllProducts";
import IconBoxes from "@/components/iconBoxes";
import DealCountdown from "@/components/deal-countdown";

const HomePage = async () => {
  const latestProducts = await GetLatestProduct()
  const featuredProducts = await getFeaturedProduct()

  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrival" />
      <ViewAllProducts />
      <DealCountdown />
      <IconBoxes />

    </>

  )
}

export default HomePage;