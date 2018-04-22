const checkBusinessResponse = (businesses, res) => {
  if (!businesses.count) {
    return res.status(200).send({
      businesses
    });
  }
  return res.status(200).send({
    message: 'Business Found!',
    businesses,
    count: businesses.count
  });
};
export default checkBusinessResponse;
