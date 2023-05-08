import { Button, Card } from "react-bootstrap"
import { priceFormatter } from "../utilities/priceFormatter"
import { useShoppingCart } from "../context/ShoppingCartContext"

type StoreItemProps = {
    id: string
    productName: string
    description: string
    unitPrice: number
    category: string
    imageUrl: string
}

export function StoreItem({ id, productName, description, unitPrice, category, imageUrl }: StoreItemProps) {
    const { increaseCartQuantity } = useShoppingCart()
    return (
        <Card className="h-100">
            <Card.Img 
                variant="top"
                src={imageUrl}
                height="200px"
                style={{objectFit: "cover"}}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between mb-2">
                    <span className="fs-2">{productName}</span>
                    <span className="ms-2 text-danger">{priceFormatter(unitPrice)}</span>
                </Card.Title>
                <Card.Text className="mt-auto mb-3">
                    <div className="text-success text-capitalize mb-2">{category}</div>
                    <div>{description}</div>
                </Card.Text>
                <div className="mt-auto" onClick={() => increaseCartQuantity(id)}>
                    <Button className="w-100">Add To Cart</Button>
                </div>
            </Card.Body>
        </Card>
    )
}