"use strict";

document.body.innerHTML = `<input id="street-name" type="text" class="form-control" placeholder="Street name" aria-label="Street name"
aria-describedby="button-addon2">
<div class="input-group-append">
<button class="btn btn-outline-secondary" type="button" id="search-button" onclick="search()">Search</button>
</div>`;

function getStreetName() {
	if (document !== null && document.getElementById('street-name') !== null) {
		return document.getElementById('street-name').value;
	} else {
		return '';
	}
}

function getRoad(name) {
	if (name !== null) {
		console.log(`getting road from name: ${name}`);
		return name;
	} else {
		return null;
	}
}

function search() {
	return '';
}

module.exports = {
	getRoad,
	getStreetName,
	search
};
