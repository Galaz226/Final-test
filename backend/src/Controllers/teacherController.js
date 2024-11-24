const Teacher = require('../models/Teacher');
const User = require('../models/User');
const { generateTeacherCode } = require('../utils/generateCode');

const teacherController = {
  
  getAllTeachers: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const teachers = await Teacher.find({ isDeleted: false })
        .populate('userId', '-__v')
        .populate('teacherPositions', '-__v')
        .skip(skip)
        .limit(limit);

      const total = await Teacher.countDocuments({ isDeleted: false });

      res.json({
        data: teachers,
        pagination: {
          total,
          page,
          lastPage: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 
  createTeacher: async (req, res) => {
    try {
      const { userData, teacherData } = req.body;

      
      const user = new User({
        ...userData,
        role: 'TEACHER'
      });
      await user.save();

     
      const teacher = new Teacher({
        ...teacherData,
        userId: user._id,
        code: generateTeacherCode()
      });
      await teacher.save();

      res.status(201).json(teacher);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = teacherController;