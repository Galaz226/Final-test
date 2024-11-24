const TeacherPosition = require('../models/TeacherPosition');

const teacherPositionController = {
  
  getAllPositions: async (req, res) => {
    try {
      const positions = await TeacherPosition.find({ isDeleted: false });
      res.json(positions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 
  createPosition: async (req, res) => {
    try {
      
      const existingPosition = await TeacherPosition.findOne({ 
        code: req.body.code 
      });
      
      if (existingPosition) {
        return res.status(400).json({ 
          message: 'Position code must be unique' 
        });
      }

      const position = new TeacherPosition({
        name: req.body.name,
        code: req.body.code,
        description: req.body.description
      });

      const newPosition = await position.save();
      res.status(201).json(newPosition);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = teacherPositionController;