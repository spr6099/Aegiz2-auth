import UserProfile from "../models/userProfile.js";

export const userProfile = async (req, res) => {
  try {
    const { userId, designation, pincode, state, address, gender } = req.body;
    let imageFile = req.file ? req.file.filename : null;

    // check if profile exists
    let existingUser = await UserProfile.findOne({ userId });
    console.log(existingUser);

    if (existingUser) {
      // UPDATE existing profile
      existingUser.designation = designation;
      existingUser.pincode = pincode;
      existingUser.state = state;
      existingUser.address = address;
      existingUser.gender = gender;
      if (imageFile) existingUser.image = imageFile;

      await existingUser.save();

      return res.json({ message: "Profile updated", profile: existingUser });
    }

    // CREATE new profile
    const newUser = await UserProfile.create({
      userId,
      designation,
      pincode,
      state,
      address,
      gender,
      image: imageFile,
    });

    res.json({ message: "Profile created", profile: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal error" });
  }
};

export const fetchUser = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId);
    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const updatedData = req.body;

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { userId },
      {
        $set: updatedData,
      },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
  }
};
