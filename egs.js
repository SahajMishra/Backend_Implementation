import express from "express";
const router = express.Router();







const depots = {
    "depots": [
        {
            "ID": 1,
            "MechanicHours": 60
        },
        {
            "ID": 2,
            "MechanicHours": 135
        },
        {
            "ID": 3,
            "MechanicHours": 188
        },
        {
            "ID": 4,
            "MechanicHours": 97
        },
        {
            "ID": 5,
            "MechanicHours": 164
        }
    ]
}



const vehicles = {
    vehicles: [{
        "TaskID": "73ce9dca-1536-4a7a-9f1e-c67083afad61",
        "Duration": 6,
        "Impact": 2

    },
    {
        "TaskID": "4b6e22ee-b4ed-45a4-a6af-5294b0d69f37",
        "Duration": 1,
        "Impact": 3

    },
    {
        "TaskID": "d6372f32-852b-46a9-8e8c-e730fecc3c22",
        "Duration": 5,
        "Impact": 5

    },
    {
        "TaskID": "ec40b581-bdfc-43e0-a047-871fdafe8167",
        "Duration": 7,
        "Impact": 3
    },

{
        "TaskID": "fb1e3165-67c9-4e96-a5c3-2d20085d293b",
        "Duration": 6,
        "Impact": 3

    },
    {

        "TaskID": "330065c0-3815-4e10-a18a-b93b117e30a8",
        "Duration": 5,
        "Impact": 1

    },
    {
        "TaskID": "72a91abc-4ed7-492c-9e99-348e7437953b",
        "Duration": 5,
        "Impact": 9
    },
{
        "TaskID": "8a7ff5b1-335c-4a2f-96d8-09c4a362e781",
        "Duration": 6,
        "Impact": 10
    }


    ]
}



router.get('/data', (req, res) => {
    res.json({
        depots,
        vehicles
    });
});


export default router