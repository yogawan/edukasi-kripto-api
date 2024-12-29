const Course = require('../models/courseModel');

const getCourses = async (req, res) => {
  try {
    const courses = await req.db.collection('courses').find().toArray();
    res.json(courses);
  } catch (error) {
    res.status(500).send('Failed to retrieve courses');
  }
};

const addCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).send('All fields (title, description, price) are required');
    }

    const newCourse = new Course({ title, description, price });
    const result = await req.db.collection('courses').insertOne(newCourse);
    res.status(201).json({ message: 'Course added successfully', courseId: result.insertedId });
  } catch (error) {
    res.status(500).send('Failed to add course');
  }
};

module.exports = { getCourses, addCourse };