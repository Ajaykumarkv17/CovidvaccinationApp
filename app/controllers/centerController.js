// app/controllers/centerController.js

const Center = require('../models/Center');

exports.renderSearchForm = (req, res) => {
  res.render('center/search');
};

exports.searchCenters = async (req, res) => {
  const { location } = req.body;
  try {
    const centers = await Center.findByLocation(location);
    res.render('center/results', { centers });
  } catch (error) {
    console.error('Error searching centers:', error);
    res.render('center/error', { message: 'An error occurred' });
  }
};

exports.selectCenter = async (req, res) => {
  const centerId = req.params.centerId;
  try {
    const center = await Center.findById(centerId);
    res.render('booking/apply', { center });
  } catch (error) {
    console.error('Error selecting center:', error);
    res.render('center/error', { message: 'An error occurred' });
  }
};
