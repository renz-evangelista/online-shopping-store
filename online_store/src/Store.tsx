import { Row, Col, Form } from "react-bootstrap"
import { StoreItem } from "./components/StoreItem"
import { useState } from "react"
import storeItems from "./data/items.json"

export function Store () {
    const [sortedItems, setSortedItems] = useState(storeItems)

    const categories = storeItems.map((item) => {return item.category})
    const uniqueCategories = [...new Set(categories)];

    const handleSearch = (event) => {
        const query = event.target.value;
        var filteredItems = [...storeItems];
        filteredItems = filteredItems.filter((item) => {
          return item.productName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        setSortedItems(filteredItems);
      };

    const compare = (a:number, b:number, ascendingOrder:boolean) => {
        if (a > b) {
          return ascendingOrder ? -1 : 1;
        }
        if (a < b) {
          return ascendingOrder ? 1 : -1;
        }
        return 0;
      }

    const handleSortPrice = (value:string) => {
        if(value == 'none'){
            setSortedItems([...storeItems])
        } else {
          let isHighest = value === "highest"
          let current = [...storeItems]
          current.sort((a, b) => 
                 compare(a.unitPrice, b.unitPrice, isHighest))
            setSortedItems([...current])
        }
    }

    const handleFilterCategory = (value:string) => {
        if(value == 'none'){
            setSortedItems([...storeItems])
        } else {
            const filtered = storeItems.filter((item) => {
                if (item.category === value) return item
            }) 
            setSortedItems(filtered)
        }
    }

    return (
        <>  
            <div className="d-flex align-items-center mb-3">
                <div>Search:</div>
                <input onChange={handleSearch} />
            </div>
            <div className="d-flex align-items-center mb-3">
                <span>Sort by Price:</span>
                <form>
                    <select  onChange={(e) => handleSortPrice(e.target.value)}>
                        <option value="none">Default</option>
                        <option value="lowest">Price (lowest)</option>
                        <option value="highest">Price (highest)</option>
                    </select>
                </form>
            </div>
            <div className="d-flex align-items-center mb-3">
                <span>Sort by Category: </span>
                <form>
                    <select  onChange={(e) => handleFilterCategory(e.target.value)}>
                        <option value="none">Default</option>
                        {uniqueCategories.map((category) =>
                            <option key={category} value={category}>{category}</option>
                        )}
                    </select>
                </form>
            </div>
            <Row md={2} xs={1} lg={3} className="g-3">
                {sortedItems.map(item => (
                    <Col key={item.id}>
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}