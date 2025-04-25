const CATEGORY_LAPTOP_ID =  'laptop'
const CATEGORY_LAPTOP_LABEL = "لپ تاپ"
const CATEGORY_MOBILE_ID = "mobile"
const CATEGORY_MOBILE_LABEL = "موبایل"
const CATEGORY_CAMERA_ID = "camera"
const CATEGORY_CAMERA_LABEL = "دوربین"

const CATEGORY_FOOD_ID = "food"
const CATEGORY_FOOD_LABEL = "غذا"

const CATEGORIES = [
    {id: CATEGORY_LAPTOP_ID, label: CATEGORY_LAPTOP_LABEL},
    {id: CATEGORY_MOBILE_ID, label: CATEGORY_MOBILE_LABEL},
    {id: CATEGORY_CAMERA_ID, label: CATEGORY_CAMERA_LABEL},
    {id: CATEGORY_FOOD_ID, label: CATEGORY_FOOD_LABEL},
]

const arrayOfProducts = [
    {
        id: 1,
        name: "مک بوک پرو",
        price: 1500,
        category: CATEGORY_LAPTOP_ID
    },
    {
        id: 2,
        name: "مک بوک پرو دو",
        price: 800,
        category: CATEGORY_LAPTOP_ID
    },
    {
        id: 3,
        name: "مک بوک ایر",
        price: 2000,
        category: CATEGORY_LAPTOP_ID
    },
    {
        id: 4,
        name: "موبایل ایفون شش",
        price: 900,
        category: CATEGORY_MOBILE_ID
    },
    {
        id: 5,
        name: "موبایل ایفون پونزده پرو",
        price: 2500,
        category: CATEGORY_MOBILE_ID
    },
    {
        id: 6,
        name: "موبایل شیائومی",
        price: 1000,
        category: CATEGORY_MOBILE_ID
    },
    {
        id: 7,
        name: "لپ تاپ ایسوس",
        price: 3000,
        category: CATEGORY_LAPTOP_ID
    },
    {
        id: 8,
        name: "لپ تاپ خیلی گرون",
        price: 3000,
        category: CATEGORY_LAPTOP_ID
    },
    {
        id: 9,
        name: "موبایل سامسونگ",
        price: 3000,
        category: CATEGORY_MOBILE_ID
    },
    {
        id: 10,
        name: "دوربین کانون",
        price: 1200,
        category: CATEGORY_CAMERA_ID
    },
    {
        id: 11,
        name: "دوربین فوجی",
        price: 1300,
        category: CATEGORY_CAMERA_ID
    }
]

export {
    CATEGORIES,
    CATEGORY_CAMERA_ID,
    CATEGORY_CAMERA_LABEL,
    CATEGORY_FOOD_ID,
    CATEGORY_FOOD_LABEL, CATEGORY_LAPTOP_ID, CATEGORY_LAPTOP_LABEL, CATEGORY_MOBILE_ID, CATEGORY_MOBILE_LABEL
}

export default CATEGORIES;