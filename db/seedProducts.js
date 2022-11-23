const seedProducts = [
        {
            title: "Tire Tread",
            description: 'Replace that tread that is slowly melting away',
            price: "35.69",
            invQty: "500",
            photo: 'https://static.grainger.com/rp/s/is/image/Grainger/448K72_AS01?hei=536&wid=536&$adapimg$=',
            catagoryId: 3
        },
        {
            title: "Blinker Fluid",
            description: 'Rehydrate with this special fluid',
            price: "87.00",
            invQty: "12",
            photo: 'https://i5.walmartimages.com/asr/0356b49b-c267-47d6-ae95-90ffd5f04dd3.04bd5f00a1b61facc1275b771e11b4e7.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
            catagoryId: 1
        },
        {
            title: "Shower Beer Holder",
            description: 'Nice rubber holder to hold your favorite shower beverage',
            price: "5",
            invQty: "41",
            photo: 'https://flipfit-cdn.akamaized.net/flipfit-prod-tmp/items/1660475893183-090335380GRYOS.webp',
            catagoryId: 2
        },
        {
            title: "Bigfoot Air Freshner",
            description: 'For when you have that new car smell that needs to smell like a locker room.',
            price: "23",
            invQty: "1",
            photo: 'https://i.etsystatic.com/16245580/r/il/483c9c/3161775434/il_794xN.3161775434_qj1h.jpg',
            catagoryId: 1
        },
    ]


const list = () =>{
    // console.log([...seedProducts])
    return [...seedProducts]
}

    module.exports = {list: list}
