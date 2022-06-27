class VacationModel {
  /**
   * @param {string} description
   * @param {string} destination
   * @param {string | null} picture
   * @param {Date} startDate
   * @param {Date} endDate
   * @param {number} price
   * @param {string | null} id
   */
  constructor(
    description,
    destination,
    startDate,
    endDate,
    price,
    picture,
    id
  ) {
    this.description = description;
    this.destination = destination;
    this.picture = picture;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.id = id;
  }
}
module.exports = VacationModel;
