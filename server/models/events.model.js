module.exports = (sequelize, Sequelize) => {
	const Events = sequelize.define("events", {
	  eventDate: {
		type: Sequelize.STRING
	  },
	  sensor1: {
		type: Sequelize.STRING
	  },
	  sensor2: {
		type: Sequelize.STRING
	  },
	  sensor3: {
		type: Sequelize.STRING
	  },
	  sensor4: {
		type: Sequelize.STRING
	  },

	});
  
	return Events;
  };