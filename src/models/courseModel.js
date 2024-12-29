class Course {
    constructor({ title, description, price }) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.createdAt = new Date();
    }
  }
  
  module.exports = Course;