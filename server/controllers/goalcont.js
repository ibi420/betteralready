const userGoal = require("../models/goalschema");

exports.getAlluserGoals = async (req, res) => {
  try {
    const goals = await userGoal.find();
    res.status(200).json({
      status: "success",
      data: {
        goals,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.getuserGoal = async (req, res) => {
  try {
    const goal = await userGoal.find({ user_id: req.params.id });
    res.status(200).json({
      status: "success",
      data: {
        goal,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};


exports.adduserGoal = async (req, res) => {
  try {
    const goal = await userGoal.findOne({ user_id: req.body.user_id });
    if (goal == null) {
      const goal = new userGoal(req.body);
      const newuserGoal = await goal.save();
      res.status(201).json({
        status: "success",
        data: {
          goal: newuserGoal,
        },
      });
    } else {
      const newuserGoal = await userGoal.updateOne(
        { user_id: req.body.user_id },
        req.body
      );
      res.status(201).json({
        status: "success",
        data: {
          goal: newuserGoal,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
    console.log(err);
  }
};


exports.updateuserGoal = async (req, res) => {
  try {
    const goal = await userGoal.findByIdAndUpdate(req.params.id, req.params.body, {
      runValidators: true,
      new: true,
    });
    res.status(201).json({
      status: "succesfully updated",
      data: goal,
    });
  } catch (err) {
    res.status(204).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteuserGoal = async (req, res) => {
  try {
    const goal = await userGoal.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};