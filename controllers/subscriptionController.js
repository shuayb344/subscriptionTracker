import Subscription from '../models/subscriptionModel.js';
export const createSubscription = async (req, res,next) => {
  try {
    const subscription = await Subscription.create({ ...req.body ,
      user: req.user._id
    });
    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
};
export const getSubscription = async (req, res,next) => {
  try{
    const subscription = await Subscription.findById(req.params.id);
    if(!subscription){
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }
    if(subscription.user.toString() !== req.user._id.toString()){
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    res.status(200).json({success: true, data: subscription});
  } catch(e){
    next(e);
  }
}

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: updatedSubscription });
  } catch (e) {
    next(e);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }

    await Subscription.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "Subscription deleted successfully" });
  } catch (e) {
    next(e);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.status = 404;
      throw error;
    }
    if (subscription.user.toString() !== req.user._id.toString()) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    if (subscription.status === "canceled") {
      const error = new Error("Subscription is already canceled");
      error.status = 400;
      throw error;
    }

    subscription.status = "canceled";
    await subscription.save();

    res.status(200).json({ success: true, data: subscription });
  } catch (e) {
    next(e);
  }
};

export const getUpcomingRenewals = async (req, res, next) => {
  try {
    const now = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(now.getDate() + 7);

    const subscriptions = await Subscription.find({
      user: req.user._id,
      status: "active",
      renewalDate: { $gte: now, $lte: sevenDaysFromNow },
    });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};
