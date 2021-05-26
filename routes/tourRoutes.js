const express = require('express');
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  getToursStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { protect } = require('../middlewares/authMiddlewares');
const { aliasTopToursMiddleware } = require('../middlewares/tourMiddlewares');
const router = express.Router();

//Middlewares
// const { checkBody } = require('../middlewares/tourMiddlewares');
//Param middleware
// router.param('id', checkID);

router.route('/top-5-tours').get(protect, aliasTopToursMiddleware, getAllTours);
router.route('/stats').get(getToursStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/').get(protect, getAllTours);
router.route('/').post(createTour);

router.route('/:id').get(getTourById);
router.route('/:id').patch(updateTour);
router.route('/:id').delete(deleteTour);

module.exports = router;
