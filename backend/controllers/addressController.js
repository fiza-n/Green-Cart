import Address from "../models/address.js";

export const addAddress = async (req, res) => {
  try {
    const address = req.body.address || req.body;

    const userId = req.userId || address.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Not authorized" });

    await Address.create({
      ...address,
      userId,
    });

    return res.json({ success: true, message: "Address added" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: "Error", message: error.message || "Issue found" });
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
