import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { priceFormatter } from "../utilities/priceFormatter"


type CartItemProps = {
    id: string
    quantity: number
}

export function CartItem({ id, quantity}: CartItemProps) {
    const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    const item = storeItems.find(item => item.id === id)

    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2}>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>
            <img 
                src={item.imageUrl}
                style={{ width: "125px", height: "75px", objectFit: "cover"}}
             />
             <div className="me-auto">
                <div>
                    {item.productName}
                </div>
                <div className="text-danger">
                    {priceFormatter(item.unitPrice * quantity)}
                </div>
             </div>

             <div className="d-flex align-items-center justify-content-center">
                <Button onClick={() => decreaseCartQuantity(id)} size="sm">-</Button>
                <span>{quantity}</span>
                <Button onClick={() => increaseCartQuantity(id)} size="sm">+</Button>
             </div>
        </Stack>
    )
}