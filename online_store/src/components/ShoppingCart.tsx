import { Button, Modal, Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { CartItem } from "./CartItem"
import { priceFormatter } from "../utilities/priceFormatter"
import storeItems from "../data/items.json"
import { useState } from "react"

export function ShoppingCart({isOpen}: {isOpen:boolean}) {
    const { closeCart, emptyCartItems, cartItems } = useShoppingCart()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleCheckout = () => {
        setIsModalOpen(true);
        emptyCartItems();
        closeCart();
    }

    return (
        <>
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Body>Thank you for purchasing!</Modal.Body>
            </Modal>
            <Offcanvas show={isOpen} onHide={closeCart} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        Cart
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Stack gap={3}>
                        {cartItems.map(item => (
                            <CartItem key={item.id} {...item} />
                        ))}
                        <div className="ms-auto fw-bold">
                            Total {priceFormatter(cartItems.reduce((total, cartItem) => {
                                    const item = storeItems.find(item => item.id === cartItem.id)
                                    return total + (item?.unitPrice || 0) * cartItem.quantity
                            }, 0))}
                        </div>
                        {cartItems.length > 0 && <div>
                            <Button onClick={handleCheckout} className="w-100">Checkout</Button>                          
                        </div>}
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas>
        </>
        
    )
}