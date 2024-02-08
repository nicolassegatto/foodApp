import { Button } from "@/components/button";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { LinkButton } from "@/components/link-button";
import { Product } from "@/components/product";
import { ProductCartProps, useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/utils/functions/currencyFormat";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Linking, Platform, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const webHook = "https://webhook.site/c0ddb5d8-60c2-4104-88d4-04c88e063733"

export default function Cart() {
  const [address, setAddress] = useState("")
  const cartStore = useCartStore()
  const navigation = useNavigation()

  const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar"
      },
      {
        text: "Remover",
        onPress: () => cartStore.remove(product.id)
      }
    ])
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega.")
    }

    const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join("")

    const message = `🍔 NOVO PEDIDO 🥤: \n${products}\n\n🗺️ Entregar em: ${address}\n💸 Valor total: ${total}`

    fetch(webHook, {
      method: 'POST',
      body: message,
    });

    cartStore.clear()
    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      {cartStore.products.length > 0 ? (

        <View className="pt-5 pr-5 pl-5 flex-1">

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 198 : 198}
            style={{ flex: 1 }}
          >

            <ScrollView showsVerticalScrollIndicator={false} >
              <View className="border-b border-slate-700">
                {
                  cartStore.products.map((product) => {
                    return (
                      <Product
                        key={product.id}
                        data={product}
                        onPress={() => handleProductRemove(product)}
                      />
                    )
                  })
                }
              </View>


            </ScrollView>

            <Input className="mt-5" placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..." onChangeText={setAddress} />

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="text-white text-xl font-subtitle">Total:</Text>
              <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
            </View>

            <Button onPress={handleOrder}>
              <Button.Text>Enviar Pedido</Button.Text>
              <Button.Icon><Feather name="arrow-right-circle" size={20} /></Button.Icon>
            </Button>
          </KeyboardAvoidingView>
        </View>

      ) : (
        <Text className="font-body text-slate-400 text-center my-8">
          Seu carrinho está vazio.
        </Text>
      )}

      <View className="p-5 gap-5">
        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>

    </View>
  )
}