function checkSpace(...args) {
  const res = {};
  for (let i = 0; i < args.length; i += 1) {
    if (args[i].trim() === '') {
      res.message = false;
    } res.message = true;
  }
}
export default checkSpace;
