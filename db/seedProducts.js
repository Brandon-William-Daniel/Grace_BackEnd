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
  {
    title: 'My Face T-Shirt',
    description: 'Get your significant others face on your shirt so everyone knows who you belong to.',
    price: '16',
    invQty: 3,
    photo: 'https://cdn.shopify.com/s/files/1/0265/2841/5828/products/CTS058_17de4885-a938-4898-8946-4b16d45c17c2_1000x.png?v=1665476930',
    catagoryId: 2
},
{
  title: 'Dissolving Swim Trunks',
  description: 'When they get wet they slowly start to slowly disappear. NOT MACHINE WASHABLE!!',
  price: '16.82',
  invQty: 5,
  photo: 'https://m.media-amazon.com/images/I/616XPiP9ZbL._AC_UX679_.jpg',
  catagoryId: 3
},
{
  title: 'Belly Button Lint Brush',
  description: 'For the person who has everything.',
  price: '3.99',
  invQty: 1,
  photo: 'https://i.etsystatic.com/13711196/r/il/ab20a5/4159285204/il_794xN.4159285204_tm3r.jpg',
  catagoryId: 4
},
{
  title: 'Q-Tip Crossbow',
  description: 'One step better than spitballs and one step lower than rubberbands', 
  price: '35.43',
  invQty: 87,
  photo: 'https://cdn.shopify.com/s/files/1/0072/1432/products/hog-wild-impulse-micro-blaster-xbow-cotton-swab-launcher-funny-gag-gifts-30379357667489_1800x1800.jpg?v=1628391520',
  catagoryId: 2
},
{
  title: 'Finger Spork',
  description: 'When you are holding your drink in one hand and a plate in the other and wish you had a third hand.',
  price:'15.84', 
  invQty: 32,
  photo: 'https://cdn.shopify.com/s/files/1/0072/1432/products/accoutrements-archie-mcphee-impulse-im-funny-stuff-finger-spork-1-spork-funny-gag-gifts-17284352606369_720x.png?v=1628466415',
  catagoryId: 1
},
{
  title: 'Pixel Puzzle',
  description: 'For the extreme puzzle enthusiast', 
  price: '14.23',
  invQty: 2,
  photo: 'https://m.media-amazon.com/images/I/91RWs8Jw2AS._AC_SX466_.jpg',
  catagoryId: 3
},
{
  title: 'American Mullet',
  description: 'George Washington had one himself',
  price: '1776',
  invQty: 1776,
  photo: 'https://m.media-amazon.com/images/I/51SuAzjwkpL._SY879_.jpg',
  catagoryId: 4
},
{
  title: 'LED Toilet Bowl Light',
  description: 'The ultimate night light for your late night endeavors',
  price: '90.09',
  invQty: 61,
  photo: 'https://m.media-amazon.com/images/I/7101enBmfRL._AC_SX679_.jpg',
  catagoryId: 3
},
{
  title: 'Blockbuster Lifetime Membership',
  description: 'Get unlimited movies for the rest of your life with this lifetime membership',
  price: '130',
  invQty: 1,
  photo: 'https://i.etsystatic.com/20873589/r/il/f13a9d/4180915618/il_794xN.4180915618_3pxv.jpg',
  catagoryId: 1
},
{
  title: 'Boss Christmas Candle',
  description: 'The ultimate gift for your favorite boss',
  price: '10',
  invQty: 8,
  photo: 'https://i.etsystatic.com/15892924/r/il/afd007/3835030340/il_1140xN.3835030340_pzrc.jpg',
  catagoryId: 2
},
{
  title: 'Dime In Ring',
  description: "When you can't afforf a diamond ring...",
  price: '3',
  invQty: 2,
  photo: 'https://i.etsystatic.com/10505745/r/il/e4ad7d/1149334817/il_794xN.1149334817_9t83.jpg',
  catagoryId: 2
}
    ]


const list = () =>{
    // console.log([...seedProducts])
    return [...seedProducts]
}

    module.exports = {list: list}
