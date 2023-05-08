const PRICE_FORMATTER =  new Intl.NumberFormat(undefined, {
    currency: "PHP", style: "currency"
})

export function priceFormatter(price: number) {
    return PRICE_FORMATTER.format(price)
}