export class Product {
    constructor (id, title, price, isDiscount, isFinished, newPrice, category, image, description, region, creator, creatorDetails, createdAt, creatorSubscription) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.isDiscount = isDiscount;
        this.isFinished = isFinished;
        this.newPrice = newPrice;
        this.category = category;
        this.image = image;
        this.description = description;
        this.region = region;
        this.creator = creator;
        this.creatorSubscription = creatorSubscription
        this.creatorDetails = creatorDetails;
        this.createdAt = createdAt;
    }
}