import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cartStore";

export function add(products: ProductCartProps[], newProduct: ProductProps){
  const existingProducts = products.find(({id}) => newProduct.id === id)

  if(existingProducts){
    return products.map((product) => product.id === existingProducts.id
    ? {...product, quantity: product.quantity + 1}
    : product
    )
  }

  return [...products, {...newProduct, quantity: 1}]
}