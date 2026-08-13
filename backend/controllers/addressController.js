import Address from "../models/address.js";

export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    await Address.create({
      ...address,
      userId,
    });
    return res.json({ success: true, message: "Address added" });
  } catch (error) {
    console.log(error);
    return res.json({ success: "Error", message: "Issue found" });
  }
};

export const getAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const foundAddress = await Address.find({ userId });
    return res.json({ success: true, foundAddress });
  } catch (error) {
    console.log(error);
    return res.json({ success: "Error", message: "Issue found" });
  }
};
