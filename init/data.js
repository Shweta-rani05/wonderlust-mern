const sampleListings = [
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
  },
  {
    title: "Luxury Beachfront Resort in Goa",
    description:
      "Wake up to ocean views in this luxury beachfront resort with world-class amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210c7?auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Goa",
    country: "India",
  },
  {
    title: "Cozy Hill Cottage in Manali",
    description:
      "A peaceful wooden cottage nestled in the hills, perfect for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Manali",
    country: "India",
  },
  {
    title: "Modern Apartment in New York City",
    description:
      "Stay in the heart of NYC with easy access to attractions and nightlife.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "New York",
    country: "United States",
  },
  {
    title: "Desert Camp in Jaisalmer",
    description:
      "Experience royal Rajasthani hospitality under the star-filled desert sky.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=60",
    },
    price: 2100,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Private Pool Villa in Bali",
    description:
      "Romantic villa with a private pool surrounded by lush tropical greenery.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?auto=format&fit=crop&w=800&q=60",
    },
    price: 5200,
    location: "Bali",
    country: "Indonesia",
  },
  {
    title: "Lakeview Cabin in Switzerland",
    description:
      "Cozy wooden cabin with breathtaking views of lakes and alpine mountains.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=60",
    },
    price: 6200,
    location: "Lucerne",
    country: "Switzerland",
  },
  {
    title: "Budget Hotel near Eiffel Tower",
    description:
      "Affordable and comfortable stay near Paris landmarks.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=60",
    },
    price: 2900,
    location: "Paris",
    country: "France",
  },
  {
    title: "Heritage Haveli in Jaipur",
    description:
      "Live like royalty in this beautifully restored Rajasthani haveli.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1523540939399-141cbff6a8d7?auto=format&fit=crop&w=800&q=60",
    },
    price: 2600,
    location: "Jaipur",
    country: "India",
  },
  {
    title: "Treehouse Stay in Wayanad",
    description:
      "Unique treehouse experience surrounded by lush green forests.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=60",
    },
    price: 2400,
    location: "Wayanad",
    country: "India",
  },
  {
    title: "Luxury Skyline Hotel",
    description:
      "High-rise luxury hotel offering stunning city skyline views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=60",
    },
    price: 7000,
    location: "Dubai",
    country: "United Arab Emirates",
  },
  {
    title: "Snow Lodge in Alaska",
    description:
      "Warm and cozy lodge with breathtaking snowy landscapes.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
    },
    price: 4800,
    location: "Alaska",
    country: "United States",
  },
  {
    title: "Backwater Houseboat in Alleppey",
    description:
      "Luxury houseboat cruising through serene Kerala backwaters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=800&q=60",
    },
    price: 3600,
    location: "Alleppey",
    country: "India",
  },
  {
    title: "Countryside Farm Stay",
    description:
      "Relax in the countryside with fresh air and organic food.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Nashik",
    country: "India",
  },
  {
    title: "Business Hotel in Bangalore",
    description:
      "Perfect stay for business travelers with modern amenities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Bangalore",
    country: "India",
  },
  {
    title: "Cliffside Resort in Santorini",
    description:
      "Enjoy iconic sunsets overlooking the Aegean Sea.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
    },
    price: 6800,
    location: "Santorini",
    country: "Greece",
  },
  {
    title: "Jungle Safari Lodge",
    description:
      "Eco-friendly lodge near wildlife safari zones.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6?auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Jim Corbett",
    country: "India",
  },
  {
    title: "Minimal Studio in Tokyo",
    description:
      "Compact and modern studio in the heart of Tokyo.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Tokyo",
    country: "Japan",
  },
  {
    title: "Riverside Camp in Rishikesh",
    description:
      "Adventure stay with rafting, yoga, and riverside views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    },
    price: 1700,
    location: "Rishikesh",
    country: "India",
  },
  {
    title: "Luxury Palace Hotel in Udaipur",
    description:
      "A royal palace converted into a luxury heritage hotel.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=60",
    },
    price: 8200,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Seaside Cottage Escape",
    description:
      "Charming seaside cottage perfect for a peaceful coastal getaway.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=60",
    },
    price: 3600,
    location: "Cornwall",
    country: "United Kingdom",
  },
];

module.exports = sampleListings;
