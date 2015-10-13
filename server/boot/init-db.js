module.exports = function (app) {
	/*
	* The `app` object provides access to a variety of LoopBack resources such as
	* models (e.g. `app.models.YourModelName`) or data sources (e.g.
	* `app.datasources.YourDataSource`). See
	* http://docs.strongloop.com/display/public/LB/Working+with+LoopBack+objects
	* for more info.
	*/

	var Actortype = app.models.Actortype;

	Actortype.destroyAll(function () {
		Actortype.create(
			{ id: 1,
				name: 'On/Off',
				ports: [{ name: 'Relay'}]
			});
		Actortype.create(
			{ id: 2,
				name: 'Dimmer',
				ports: [{ name: 'PWM'}]
			});
		Actortype.create(
			{ id: 3,
				name: 'Dimmer RGB',
				ports: [{ name: 'red'},{ name: 'green'},{ name: 'blue'}]
			});
	});


	/*
	app.models.Location.find(function (err, list) {
	console.log(list);
	})
	*/
};
