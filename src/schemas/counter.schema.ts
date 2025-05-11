import { model } from "mongoose";
import { Schema } from "mongoose";

const CounterSchema = new Schema({
  seq: { type: Number, default: 0 },
});

export default model("Counter", CounterSchema);
