export class CartItem {
    constructor (id, title, price, quantity, totalAmount, creator, creatorDetails) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        this.totalAmount = totalAmount;
        this.creator = creator;
        this.creatorDetails = creatorDetails;
    }
}