import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cartStore";

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const existingProducts = products.find(({ id }) => newProduct.id === id)

  if (existingProducts) {
    return products.map((product) => product.id === existingProducts.id
      ? { ...product, quantity: product.quantity + 1 }
      : product
    )
  }

  return [...products, { ...newProduct, quantity: 1 }]
}

export function remove(products: ProductCartProps[], productRemovedId: string) {
  const updateProducts = products.map((product) => {
    return (
      product.id === productRemovedId ? (
        { ...product, quantity: product.quantity > 1 ? product.quantity - 1 : 0 }
      ) : (product)
    )
  })

  return updateProducts.filter((product) => product.quantity > 0)
}