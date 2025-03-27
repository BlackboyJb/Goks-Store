import ProductList from "@/components/shared/product/product-list";
import { GetLatestProduct, getFeaturedProduct } from "@/lib/actions/product.actions";
import ProductCarousel from '@/components/shared/product/product-carousel'
import ViewAllProducts from "@/components/viewAllProducts";

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
    </>

  )
}

export default HomePage;