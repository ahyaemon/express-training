const carts = new Map()

function addAmountToCart(username) {
    const amount = carts.has(username) ? carts.get(username) : 0
    carts.set(username, amount + 1)
}

function getAmountFromCart(username) {
    return carts.has(username) ? carts.get(username) : 0
}

module.exports = {
    addAmountToCart,
    getAmountFromCart,
}
