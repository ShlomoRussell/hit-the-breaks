class VacationModel {
  /**
   * @param {string} description
   * @param {string} destination
   * @param {string | null} picture
   * @param {Date} startDate
   * @param {Date} endDate
   * @param {number} price
   * @param {number} following
   * @param {string | null} id
   */
  constructor(
    destination,
    description,
    startDate,
    endDate,
    price,
    picture,
    id,
    following
  ) {
    this.description = description;
    this.destination = destination;
    this.picture = picture;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.following = following;
    this.id = id;
  }
}
export default VacationModel;
