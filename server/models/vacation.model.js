

class VacationModel{
    description;
    destination;
    picture;
    startDate;
    endDate;
    price;
    id;
    constructor(description, destination, picture, startDate, endDate, price,) {
        this.description = description;
        this.destination = destination;
        this.picture = picture;
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
        this.id = null;
}
}
module.exports=VacationModel