import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    trim: true,
    minLength:2,
    maxLength: 50
  },
  price:{
    type: Number,
    required: true,
    min: [0,"price must be greater than 0"],
    max:[1000,"price must be less than 1000"]
  },
  currency:{
    type: String,
    enum: ["USD", "EUR", "GBP", "JPY", "AUD", "CAD"],
    default: "USD"
  },
  frequency:{
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"]
  },
  category:{
    type: String,
    enum: ["entertainment", "sports", "news", "lifestyle", "education", "politics", "technology", "health", "other"],
    required: true
  },
  paymentMethod:{
    type: String,
    enum: ["credit_card", "debit_card", "paypal", "bank_transfer", "crypto"],
    required: true
  },
  status:{
    type:String,
    enum: ["active", "expired", "canceled"],
    default: "active"
  },
  startDate:{
    type:Date,
    required: true,
    validate:{
      validator: function(value){
        return value >= new Date();
      },
      message: "startDate must be in the future"
    }
    },
  renewalDate:{
    type: Date,
    validate:{
      validator: function(value){
        return value > this.startDate;
      },
      message: "renewalDate must be after startDate"
    }
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index:true
  }
}, { timestamps: true });

subscriptionSchema.pre("save", async function () {
  const frequencyMap = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };

  const daysToAdd = frequencyMap[this.frequency];
  if (!daysToAdd) {
    throw new Error("Invalid frequency value");
  }

  if (!this.startDate) {
    throw new Error("startDate is required");
  }

  if (!this.renewalDate) {
    const renewal = new Date(this.startDate);
    renewal.setDate(renewal.getDate() + daysToAdd);
    this.renewalDate = renewal;
  }

  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;