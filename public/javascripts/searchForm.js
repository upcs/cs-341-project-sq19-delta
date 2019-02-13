function getRoad(name) {
	if (name !== null) {
		console.log(`getting road from name: ${name}`);
		return name;
	} else {
		return null;
	}
}

module.exports = {
	getRoad
};
