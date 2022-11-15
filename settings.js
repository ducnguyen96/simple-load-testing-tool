const settings = {
	endpoints: [
		[
			{
				method: "GET",
				name: "List branches",
				url: "/v1/branches/branches",
			},
			{
				method: "GET",
				name: "me",
				url: "/v1/auth/me",
			},
		],
		// FIND PATIENT
		{
			method: "GET",
			name: "list patients where idNumber iLike",
			url: "/v1/patients?filterBy[idNumber][_iLike]=1%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "list patients where idNumber iLike",
			url: "/v1/patients?filterBy[idNumber][_iLike]=10%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "list patients where idNumber iLike",
			url: "/v1/patients?filterBy[idNumber][_iLike]=102%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "list patients where idNumber iLike",
			url: "/v1/patients?filterBy[idNumber][_iLike]=1021%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "patient did",
			url: "/v1/patients/did?input%5BidNumber%5D=10121010&input%5Bname%5D=ANIL%20KUMAR%20SHRESTHA",
			sleep: 10,
		},
		{
			method: "GET",
			name: "patient info by did",
			url: "/v1/patients/info/gLJYNbufkOUmQq4puN7RF2UwVpJMHX9QcMrzUE%2BcsFdR3D4npeZHcKvJygr%2FJCjovtQPx1gk2QjGVq5I4W%2Bp8Q%3D%3D",
			sleep: 3000,
		},
		// FIND CLIENT
		{
			method: "GET",
			name: "list clients where name iLike or code iLike",
			url: "/v1/clients?filterBy[_or][name][_iLike]=%25k%25&filterBy[_or][code][_iLike]=%25k%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "list clients where name iLike or code iLike",
			url: "/v1/clients?filterBy[_or][name][_iLike]=%25k%25&filterBy[_or][code][_iLike]=%25kl%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "list clients where name iLike or code iLike",
			url: "/v1/clients?filterBy[_or][name][_iLike]=%25k%25&filterBy[_or][code][_iLike]=%25kli%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "list clients where name iLike or code iLike",
			url: "/v1/clients?filterBy[_or][name][_iLike]=%25k%25&filterBy[_or][code][_iLike]=%25klin%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "list client details by id",
			url: "/v1/clients/Zd7Sq1",
			sleep: 3000,
		},
		// FIND TEST
		{
			method: "GET",
			name: "list test where code iLike",
			url: "/v1/tests/tests?filterBy[code][_iLike]=%25c%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "list test where code iLike",
			url: "/v1/tests/tests?filterBy[code][_iLike]=%25ca%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "get single test details",
			url: "/v1/tests/single-tests/oW1PWb",
			sleep: 10,
		},
		{
			method: "GET",
			name: "list test where code iLike",
			url: "/v1/tests/tests?filterBy[code][_iLike]=%25b%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "list test where code iLike",
			url: "/v1/tests/tests?filterBy[code][_iLike]=%25bi%25",
			sleep: 10,
		},
		{
			method: "GET",
			name: "get single test details",
			url: "/v1/tests/single-tests/hy0IQ8",
			sleep: 10,
		},
		{
			method: "GET",
			name: "get all specimens",
			url: "/v1/tests/specimens?limit=100",
			sleep: 10,
		},
		// CREATE ORDER
		{
			method: "GET",
			name: "list order",
			url: "/v1/orders/orders?limit=10&order%5B0%5D%5B0%5D=priority&order%5B0%5D%5B1%5D=DESC&order%5B1%5D%5B0%5D=createdAt&order%5B1%5D%5B1%5D=DESC",
			sleep: 0,
		},
	],
	users: 1,
	batch: 0,
	domain: "http://localhost:3000",
	colors: {
		veryFast: "#7fdbff",
		fast: "#01ff70",
		quiteSlow: "#ffdc00",
		slow: "#ff851b",
		error: "#ff4136",
	},
	token: "",
};
