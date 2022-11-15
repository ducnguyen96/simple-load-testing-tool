const runButton = document.querySelector("#run");
const runContainerDom = document.querySelector("#run-container");

const createUserDom = (name, i) => {
	const userDataDom = document.createElement("div");
	userDataDom.className = "user-data";
	userDataDom.id = name;

	const spanDom = document.createElement("pre");
	spanDom.innerHTML = name;
	if (i < 10) {
		spanDom.innerHTML += "  ";
	} else if (i < 100) {
		spanDom.innerHTML += " ";
	}

	const timeBarDom = document.createElement("div");
	timeBarDom.className = "time-bar";

	userDataDom.appendChild(spanDom);
	userDataDom.appendChild(timeBarDom);

	return userDataDom;
};

const generateUser = () => {
	const nUser = concurrentUserDom.value;
	for (let i = 1; i <= nUser; i++) {
		let name = `user-${i}`;
		const dom = createUserDom(name, i);
		runContainerDom.appendChild(dom);
	}
};

const deleteOldUser = () => {
	const doms = document.querySelectorAll(".user-data");
	doms.forEach((dom) => dom.remove());
};

const executeEndpoint = async ({ method, url, name, sleep, body }) => {
	const domain = settings.domain;

	return new Promise((resolve) => {
		fetch(`${domain}${url}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${settings.token}`,
			},
			body,
			mode: "cors",
		})
			.catch((err) => {
				resolve(err.message);
			})
			.then((res) => {
				if (!res.ok) {
					res.json().then((json) => {
						resolve(json.message);
					});
				} else {
					resolve();
				}
			});
	});
};

const drawBar = (user, name, timeTook, error) => {
	let color;

	if (error) {
		color = settings.colors.error;
	} else {
		if (timeTook < 100) color = settings.colors.veryFast;
		if (100 < timeTook && timeTook < 1000) color = settings.colors.fast;
		if (1000 < timeTook && timeTook < 3000) color = settings.colors.quiteSlow;
		if (timeTook > 3000) color = settings.colors.slow;
	}

	const timeBarDom = document.querySelector(`#${user} > .time-bar`);

	const newBar = document.createElement("div");
	newBar.className = "bar";
	newBar.style.backgroundColor = color;
	newBar.style.width = `${timeTook / 100}rem`;

	const badgeDom = document.createElement("span");
	badgeDom.style.display = "none";
	badgeDom.className = "badge";
	if (error) {
		badgeDom.innerHTML = `${name} - ${error} - ${timeTook}ms`;
	} else {
		badgeDom.innerHTML = `${name} - ${timeTook}ms`;
	}

	newBar.appendChild(badgeDom);

	newBar.addEventListener("mouseover", () => {
		badgeDom.style.display = "block";
	});

	newBar.addEventListener("mouseleave", () => {
		badgeDom.style.display = "none";
	});

	timeBarDom.appendChild(newBar);
};

const userLoad = async (user) => {
	let batch = 0;
	for (const endpoint of settings.endpoints) {
		let name;
		let error;
		const sleep = endpoint.sleep || 0;

		const start = new Date().getTime();

		if (Array.isArray(endpoint)) {
			batch++;
			name = `batch-${batch}`;
			const errs = await Promise.all(endpoint.map((i) => executeEndpoint(i)));
			const filtered = errs.filter((err) => err);
			error = filtered.join("; ");
		} else {
			name = endpoint.name;
			error = await executeEndpoint(endpoint);
		}

		if (sleep) await sleepFn(sleep);

		const end = new Date().getTime();

		const timeTook = end - start - sleep;
		drawBar(user, name, timeTook, error);
	}
};

const load = async () => {
	const users = [];
	for (let i = 1; i <= concurrentUserDom.value; i++) {
		users.push(`user-${i}`);
	}

	await Promise.all(users.map((user) => userLoad(user)));
};

const run = () => {
	deleteOldUser();
	generateUser();
	load();
};

runButton.addEventListener("click", run);
