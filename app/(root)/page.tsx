import ProductList from "@/components/shared/product/product-list";
import { GetLatestProduct } from "@/lib/actions/product.actions";

const HomePage = async () => {
  const latestProduct = await GetLatestProduct()

  return (<ProductList data={latestProduct} title="Newest Arrival" />)
}

export default HomePage;