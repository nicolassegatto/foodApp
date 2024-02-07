import { ProductProps } from "@/utils/data/products"
import { create } from "zustand"
import * as cartInMemory from "./helpers/cartInMemory"
import Product from "@/app/product/[id]"

export type ProductCartProps = ProductProps & {
  quantity: number
}

type StateProps = {
  products: ProductCartProps[]
  add: (product: ProductProps) => void
}


export const useCartStore = create<StateProps>((set) => ({
  products: [],

  add: (product: ProductProps) => 
    set((state) => ({
      products: cartInMemory.add(state.products, product)
    }))
  
}))