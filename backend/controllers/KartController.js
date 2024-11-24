import userModel from "../models/userModel.js"

// add Products to user Kart
const addToKart = async (req, res) => {
    console.log("addToKart function hit", req.body);
    try {

        const { userId, itemId, size } = req.body;
        console.log("UserId received:", userId); 

        const userData = await userModel.findById(userId);
        console.log("Fetched User Data: ", userData);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        
        let KartData = await userData.KartData || {} ;

        if (KartData[itemId]) {
            if (KartData[itemId][size]) {
                KartData[itemId][size] += 1
            }
            else {
                KartData[itemId][size] = 1
            }
        }
        else {
            KartData[itemId] = {}
            KartData[itemId][size] = 1
        }
        await userModel.findByIdAndUpdate(userId, { KartData })

        res.json({ success: true, message: "Added To Cart" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};

// update  user Kart
const updateKart = async (req, res) => {
    try {

        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let KartData = await userData.KartData || {};

        if (!KartData[itemId]) {
            KartData[itemId] = {}; // Initialize item
        }

        if (KartData[itemId][size] === undefined) {
            KartData[itemId][size] = 0; // Initialize size if undefined
        }

        KartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { KartData })
        
        res.json({ success: true, message: "Kart Updated" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// get user Kart data
const getKart = async (req, res) => {
    try {

        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let KartData = await userData.KartData;

        res.json({ success: true, KartData})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export { addToKart, updateKart, getKart }