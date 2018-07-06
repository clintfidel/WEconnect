const mockData = {
  signupResponse: {
    message: 'Signed up successfully',
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzA2MTM3OTYsImN1cnJlbnRVc2VyIjp7ImlkIjoxfSwiaWF0IjoxNTMwNTI3Mzk2fQ.WtEYGB6Wz689VVaufSkwBgol8Hl0RbCK4RBK3BvTpdk`
  },
  loginResponse: {
    message: 'Logged In Successfully',
    data: {
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzA2MTM3OTYsImN1cnJlbnRVc2VyIjp7ImlkIjoxfSwiaWF0IjoxNTMwNTI3Mzk2fQ.WtEYGB6Wz689VVaufSkwBgol8Hl0RbCK4RBK3BvTpdk`
    }
  },
  editprofileResponse: {
    status: 'success',
    message: 'Profile updated successfully',
    updatedProfile: {
      fullname: 'Clinton Fidelis',
      username: 'clintfidel',
      userId: 1,
      email: 'clinton.fidelis@andela.com',
    }
  },
  signupData: {
    fullname: 'Clint Fidelis',
    username: 'clintfidel',
    email: 'clintfidel@gamil.com',
    password: 'clintfidel'
  },
  loginData: {
    username: 'clintfidel',
    password: 'clintfidel'
  },
  getUserDetails: {
    data: {
      userId: 1,
      fullname: 'Clinton Fidelis',
      username: 'clintfidel',
      email: 'clinton.fidelis@andela.com',
      image: null
    }
  },
  editedUserDetails: {
    fullname: 'Clinton Fidelis',
    username: 'clintfidel',
    userId: 1,
    email: 'clinton.fidelis@andela.com',
  },
  userInput: {
    username: 'clintfidel',
    fullname: 'Clint Fidelis',
    email: 'clintfidel@gamil.com',
    password: 'clintfidel',
    passwordConfirm: 'clintfidel'
  },
  getBusinessDetails: {
    businesses: {
      count: 2,
      rows: [
        {
          id: 3,
          name: "Andela Business",
          image: "jdnwyjyoiarkt47hdjjdghmxbia",
          details: "andela business is awesome",
          location: "LAGOS",
          categoryId: 4,
          views: 12,
          userId: 1,
          createdAt: "2018-07-03T12:20:05.584Z",
          updatedAt: "2018-07-04T12:27:12.066Z",
          Category: {
            category: "science and tech"
          },
          User: {
            username: "clintrk"
          },
          Reviews: [
            {
              rate: 1
            },
            {
              rate: 5
            },
            {
              rate: 2
            },
            {
              rate: 4
            },
            {
              rate: 4
            },
            {
              rate: 3
            },
            {
              rate: 5
            }
          ]
        },
        {
          id: 3,
          name: "Andela Business Two",
          image: "jdnwyjyoiarkt47mxbia",
          details: "andela business is great",
          location: "KANO",
          categoryId: 6,
          views: 19,
          userId: 1,
          createdAt: "2018-07-03T12:20:05.584Z",
          updatedAt: "2018-07-04T12:27:12.066Z",
          Category: {
            category: "Food"
          },
          User: {
            username: "clintfidel"
          },
          Reviews: [
            {
              rate: 5
            },
            {
              rate: 5
            },
            {
              rate: 3
            },
            {
              rate: 4
            },
            {
              rate: 5
            },
            {
              rate: 3
            },
            {
              rate: 4
            }
          ]
        },
      ]
    }
  },
  allCategories: {
    status: "Success",
    Categories: [
      {
        id: 1,
        category: "food",
        createdAt: "2018-06-29T20:12:21.990Z",
        updatedAt: "2018-06-29T20:12:21.990Z"
      },
      {
        id: 2,
        category: "fashion",
        createdAt: "2018-06-29T20:12:21.990Z",
        updatedAt: "2018-06-29T20:12:21.990Z"
      },
      {
        id: 3,
        category: "entertainment",
        createdAt: "2018-06-29T20:12:21.990Z",
        updatedAt: "2018-06-29T20:12:21.990Z"
      },
      {
        id: 4,
        category: "sports",
        createdAt: "2018-06-29T20:12:21.990Z",
        updatedAt: "2018-06-29T20:12:21.990Z"
      },
      {
        id: 5,
        category: "health",
        createdAt: "2018-06-29T20:12:21.990Z",
        updatedAt: "2018-06-29T20:12:21.990Z"
      },
      {
        id: 6,
        category: "science and tech",
        createdAt: "2018-06-29T20:12:21.990Z",
        updatedAt: "2018-06-29T20:12:21.990Z"
      },
      {
        id: 7,
        category: "others",
        createdAt: "2018-06-29T20:12:21.990Z",
        updatedAt: "2018-06-29T20:12:21.990Z"
      }
    ]
  },
  businessDetails: {
    name: 'Andela business',
    location: 'LAGOS',
    categoryId: 4,
    details: 'andela business is awesome',
    image: 'nknkffknsjibfinkbffshjbf'
  },
  businessResponse: {
    message: "Business created successfully",
    businessProfile: {
      id: 1,
      name: "Andela business",
      image: "nknkffknsjibfinkbffshjbf",
      details: "andela business is awesome",
      location: "LAGOS",
      categoryId: 4,
      views: 0,
      userId: 1,
      createdAt: "2018-07-05T13:05:12.450Z",
      updatedAt: "2018-07-05T13:05:12.450Z",
      Category: {
        category: "sports"
      }
    }
  },
  editedBusinessDetails: {
    name: 'Andela Card business',
    location: 'KANO',
    categoryId: 5,
    details: 'andela business is great',
    image: 'jfjubvubbbbbgbbdhbfhuyf'
  },
  businessId: {
    businessId: 1
  },
  editedBusinessResponse: {
    status: "success",
    message: "Business successfully edited",
    business: {
      id: 1,
      name: "Andela Card business",
      image: "jfjubvubbbbbgbbdhbfhuyf",
      details: "andela business is great",
      location: "KANO",
      categoryId: 5,
      views: 5,
      userId: 1,
      createdAt: "2018-06-29T20:13:31.901Z",
      updatedAt: "2018-07-05T13:19:51.427Z",
      Category: {
        category: "health"
      }
    }
  },
  deletedBusinessResponse: {
    message: "Business deleted successfully",
    businessId: 1
  },
  viewBusinessResponse: {
    message: "Business found!",
    business: {
      id: 1,
      name: "Andela Card business",
      image: "null",
      details: "andela business is great",
      location: "KANO",
      categoryId: 3,
      views: 123,
      userId: 1,
      createdAt: "2018-06-29T20:13:31.901Z",
      updatedAt: "2018-07-05T13:19:51.427Z",
      Category: {
        category: "entertainment"
      }
    }
  },
  searchDetails: {
    name: 'Andela',
    location: 'LAGOS',
    category: 'health'
  },
  reviewResponse: {
    status: "success",
    reviews: {
      count: 7,
      rows: [
        {
          id: 15,
          userId: 1,
          businessId: 1,
          rate: 4,
          comments: "cool business",
          createdAt: "2018-07-02T12:02:43.948Z",
          updatedAt: "2018-07-02T13:05:59.571Z",
          User: {
            username: "clintrk"
          }
        },
        {
          id: 14,
          userId: 1,
          businessId: 1,
          rate: 5,
          comments: "hellopeopeplee",
          createdAt: "2018-07-02T01:37:19.024Z",
          updatedAt: "2018-07-02T11:43:54.483Z",
          User: {
            username: "clintrk"
          }
        },
        {
          id: 13,
          userId: 2,
          businessId: 1,
          rate: 3,
          comments: "hello business",
          createdAt: "2018-07-02T01:37:03.332Z",
          updatedAt: "2018-07-03T08:48:53.488Z",
          User: {
            username: "rose123"
          }
        },
        {
          id: 12,
          userId: 1,
          businessId: 1,
          rate: 3,
          comments: "another business",
          createdAt: "2018-07-02T01:36:39.296Z",
          updatedAt: "2018-07-02T10:48:56.817Z",
          User: {
            username: "clintrk"
          }
        },
        {
          id: 11,
          userId: 1,
          businessId: 1,
          rate: 3,
          comments: "this is great",
          createdAt: "2018-07-02T01:36:13.524Z",
          updatedAt: "2018-07-02T10:49:12.635Z",
          User: {
            username: "clintrk"
          }
        }
      ]
    },
    count: 7,
    pages: 2
  },
  reviewDetails: {
    comments: 'very good business',
    rate: 5
  },
  addReviewResponse: {
    message: "You have successfully reviewed this business",
    Review: {
      id: 25,
      userId: 1,
      businessId: 1,
      rate: 5,
      comments: "very good business",
      createdAt: "2018-07-05T15:41:53.253Z",
      updatedAt: "2018-07-05T15:41:53.253Z",
      User: {
        username: "clintrk"
      }
    }
  },
  reviewId: {
    reviewId: 1
  },
  editedReview: {
    comments: 'nice nice',
    rate: 3
  },
  editedReviewResponse: {
    message: "You have successfully updated this review",
    review: {
      id: 1,
      userId: 1,
      businessId: 1,
      rate: 4,
      comments: "nice njice",
      createdAt: "2018-07-05T15:41:53.253Z",
      updatedAt: "2018-07-05T16:05:09.035Z",
      User: {
        username: "clintrk"
      }
    }
  }
};

export default mockData;
