module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Categories', [
      {
        category: 'food',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'fashion',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'entertainment',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'sports',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'health',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'science and tech',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        category: 'others',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('Categories', null, {})
};
