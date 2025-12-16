export const formatPrice = (price) => {
  return `¥${Number(price).toFixed(0)}`
}

export const formatPriceWithDecimal = (price) => {
  return `¥${Number(price).toFixed(2)}`
}

export const formatPriceRange = (minPrice, maxPrice) => {
  return `¥${Number(minPrice).toFixed(0)} - ¥${Number(maxPrice).toFixed(0)}`
}

export default formatPrice

