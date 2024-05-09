export const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
        month: 'long',
        day: 'numeric',
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}

export const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-UK', {style: 'currency', currency: 'GBP'}).format(amount);

}