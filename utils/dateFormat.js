const dateFormat = (date) => {
  const d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  return [month, day, year].join("/");
};

module.exports = dateFormat;
