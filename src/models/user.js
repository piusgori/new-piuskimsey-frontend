export class User {
    constructor (id, name, email, phoneNumber, region, products, cart, orders, token, isAdmin, sessionExpiry) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.region = region;
        this.products = products;
        this.cart = cart;
        this.orders = orders;
        this.token = token;
        this.isAdmin = isAdmin;
        this.sessionExpiry = sessionExpiry
    }
}