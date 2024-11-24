const validateRequest = {
    teacherPosition: (req, res, next) => {
      const { name, code } = req.body;
      
      if (!name || !code) {
        return res.status(400).json({
          message: 'Name and code are required'
        });
      }
  
      if (code.length < 3) {
        return res.status(400).json({
          message: 'Code must be at least 3 characters long'
        });
      }
  
      next();
    },
  
    teacher: (req, res, next) => {
      const { userData, teacherData } = req.body;
      
      if (!userData || !teacherData) {
        return res.status(400).json({
          message: 'User data and teacher data are required'
        });
      }
  
      const { name, email, phoneNumber, identity } = userData;
      if (!name || !email || !phoneNumber || !identity) {
        return res.status(400).json({
          message: 'Missing required user fields'
        });
      }
  
      const { startDate } = teacherData;
      if (!startDate) {
        return res.status(400).json({
          message: 'Start date is required'
        });
      }
  
      next();
    }
  };
  
  module.exports = validateRequest;