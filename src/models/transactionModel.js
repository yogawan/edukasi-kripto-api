class Transaction {
    constructor({ userId, courseId, courseTitle, price }) {
      this.userId = userId; // ID pengguna yang melakukan transaksi
      this.courseId = courseId; // ID course yang dibeli
      this.courseTitle = courseTitle; // Judul course yang dibeli
      this.price = price; // Harga course
      this.transactionDate = new Date(); // Waktu transaksi
    }
  }
  
  module.exports = Transaction;
  