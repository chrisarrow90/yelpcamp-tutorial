const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  // clear database
  await Campground.deleteMany({});

  // seed
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const randPrice = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      // YOUR USER ID
      author: '5fe17c571c64b2429c1a73ed',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, autem officia. Commodi ab rerum ad sed deleniti eos ducimus inventore voluptatem iste? Inventore maxime nihil magni, alias explicabo rerum eum?',
      price: randPrice,
      geometry: {
        type: 'Point',
        coordinates: [-113.1331, 47.02],
      },
      images: [
        {
          url:
            'https://res.cloudinary.com/dngdf3hop/image/upload/v1608648219/YelpCamp/zagq4l68u8lfxorhmk1k.jpg',
          filename: 'YelpCamp/zagq4l68u8lfxorhmk1k',
        },
        {
          url:
            'https://res.cloudinary.com/dngdf3hop/image/upload/v1608648219/YelpCamp/iu3pyihcbnqczgj35umk.jpg',
          filename: 'YelpCamp/iu3pyihcbnqczgj35umk',
        },
        {
          url:
            'https://res.cloudinary.com/dngdf3hop/image/upload/v1608648219/YelpCamp/jsn7avr3x7cpicpjs0c9.jpg',
          filename: 'YelpCamp/jsn7avr3x7cpicpjs0c9',
        },
        {
          url:
            'https://res.cloudinary.com/dngdf3hop/image/upload/v1608650113/YelpCamp/vc6lrahqhd4tmnjszm9p.jpg',
          filename: 'YelpCamp/vc6lrahqhd4tmnjszm9p',
        },
        {
          url:
            'https://res.cloudinary.com/dngdf3hop/image/upload/v1608650114/YelpCamp/vycazfxmqn20iwr9avws.jpg',
          filename: 'YelpCamp/vycazfxmqn20iwr9avws',
        },
        {
          url:
            'https://res.cloudinary.com/dngdf3hop/image/upload/v1608650112/YelpCamp/d1fau52mktcr9b3mpnms.jpg',
          filename: 'YelpCamp/d1fau52mktcr9b3mpnms',
        },
        {
          url:
            'https://res.cloudinary.com/dngdf3hop/image/upload/v1608650115/YelpCamp/filefnxcnp9tygcr7u5w.jpg',
          filename: 'YelpCamp/filefnxcnp9tygcr7u5w',
        },
        {
          url:
            'https://res.cloudinary.com/dngdf3hop/image/upload/v1608650115/YelpCamp/f2fl2fzrq9d8q8fdu3sk.jpg',
          filename: 'YelpCamp/f2fl2fzrq9d8q8fdu3sk',
        },
        {
          url:
            'https://res.cloudinary.com/dngdf3hop/image/upload/v1608650110/YelpCamp/fhxrgrd52ikj9yykdbjs.jpg',
          filename: 'YelpCamp/fhxrgrd52ikj9yykdbjs',
        },
      ],
    });

    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());
