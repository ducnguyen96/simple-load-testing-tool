const concurrentUserDom = document.querySelector("#concurrent-user");
const listEndpointDom = document.querySelector("#list-endpoints");
const addEndpointDom = document.querySelector("#add");
const addBatchEndpointDom = document.querySelector("#addBatch");
const fmethodDom = document.querySelector("#fmethod");
const fnameDom = document.querySelector("#fname");
const furlDom = document.querySelector("#furl");
const fbodyDom = document.querySelector("#fbody");
const fsleepDom = document.querySelector("#fsleep");

const domainDom = document.querySelector("#domain");

const addLi = (inner) => {
	const dom = document.createElement("li");
	dom.innerHTML = inner;
	listEndpointDom.appendChild(dom);
};

const addBatch = (inner) => {
	const lastUl = listEndpointDom.lastChild;

	let ulDom = lastUl;

	if (!lastUl || !lastUl.lastChild.lastChild) {
		settings.batch += 1;
		addLi(`BATCH - ${settings.batch}:`);
		ulDom = document.createElement("ul");
		listEndpointDom.appendChild(ulDom);
	}

	const liDom = document.createElement("li");
	liDom.innerHTML = inner;
	ulDom.appendChild(liDom);

	domainDom.value = settings.domain;
};

const seed = () => {
	settings.endpoints.forEach((item) => {
		if (Array.isArray(item)) {
			item.forEach(({ name, method }) => addBatch(`${method} - ${name}`));
		} else {
			const { name, method, sleep } = item;
			addLi(`${method} - ${name} - ${sleep}ms`);
		}
	});

	concurrentUserDom.value = settings.users;
};

const addHandler = () => {
	addEndpointDom.addEventListener("click", (e) => {
		e.preventDefault();

		const method = fmethodDom.value;
		const name = fnameDom.value;
		const url = furlDom.value;
		let body = fbodyDom.value;
		if (method === "GET") body = null;
		const sleep = fsleepDom.value;

		settings.endpoints.push({ method, name, url, body, sleep });
		addLi(`${method} - ${name} - ${sleep}ms`);
	});
};

const addBatchHandler = () => {
	addBatchEndpointDom.addEventListener("click", (e) => {
		e.preventDefault();

		const method = fmethodDom.value;
		const name = fnameDom.value;
		const url = furlDom.value;
		let body = fbodyDom.value;
		if (method === "GET") body = null;
		const sleep = fsleepDom.value;

		const length = settings.endpoints.length;
		if (Array.isArray(settings.endpoints[length - 1])) {
			settings.endpoints[length - 1].push({ method, name, url, body, sleep });
		} else {
			settings.endpoints.push([{ method, name, url, body, sleep }]);
		}

		addBatch(`${method} - ${name}`);
	});
};

const onDomainUpdate = (e) => {
	settings.domain = e.target.value;
};

const setup = () => {
	seed();
	addHandler();
	addBatchHandler();
	domainDom.addEventListener("change", onDomainUpdate);
};

setup();
