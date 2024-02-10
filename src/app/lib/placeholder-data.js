const users = [
    {
      id: '410544b2-4001-4271-9855-fec4b6a6442a',
      email: 'artisan01@handcrafted.com',
      role: 'artisan',
      password: 'artisan01',
      name: 'Nelson Oliveira',
      image_url: '',
      phone: '501225230',
    },
    {
        id: '410544c2-4001-4271-9855-fec4b6a6442a',
        email: 'customer01@handcrafted.com',
        role: 'customer',
        password: 'customer01',
        name: 'Paul Norton',
        image_url: '',
        phone: '501223355',
      },
  ];
  
  const items = [
    {
      id: 'd7a66f1b-2b51-4ab8-9522-6778f3d2564d',
      name: 'Yaiza Ring',
      category: 'Jewelry',
      description: 'Beautiful clear zirconia crystals sit in a cluster build on this stunner of a ring and will add a little extra sparkle to your day and night.',
      price: 1000,
      image_url: '',
      published: true,
      artisan_id: users[0].id
    },
  ];
  
  const comments = [
    {
      id: 'b7b2ca15-597d-4b35-8027-a619c8cdea24',
      comment: 'Excelent product',
      rate: 5,
      item_id: items[0].id,
      user_id: users[1].id
    },
  ];

  module.exports = {
    users,
    items,
    comments
  };
  