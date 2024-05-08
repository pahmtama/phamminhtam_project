export function fomatNumber(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function fomatCurrency(value: number, currency: string = 'VND') {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ' + currency;
}
