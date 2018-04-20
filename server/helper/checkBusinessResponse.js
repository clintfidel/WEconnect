const checkBusinessResponse = (business, res) => {
  if (business.length === 0) {
    return res.status(200).send({
      Businesses: business
    });
  }
  return res.status(200).send({
    message: 'Business Found!',
    Businesses: business
  });
};
export default checkBusinessResponse;
