const catchAsync = require('./../util/catchAsync');
const fs = require('fs');

const sideNavbar = fs.readFileSync(
  `${__dirname}/../public/html/templates/nav-bar-template.html`,
  'utf-8',
);

exports.getDashboard = (req, res) => {
  const templateDashboard = fs.readFileSync(
    `${__dirname}/../public/html/dashboard.html`,
    'utf-8',
  );
};
