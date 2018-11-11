function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals)
}

function toKG(weight) {
    return round((weight / 2.21), 1)
}

function fromKG(weight) {
    return round((weight * 2.21), 1)
}

module.exports = {
    round,
    toKG,
    fromKG
}
