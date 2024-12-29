class User {
    constructor({ name, email, password, balance }) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.balance = balance || 0;
      this.createdAt = new Date();
    }
  }
  
module.exports = User;  