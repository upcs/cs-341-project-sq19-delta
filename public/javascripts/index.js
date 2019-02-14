function search() {
	let name = document.getElementById('street-name').value;
	if (name !== null) {
		let url = `http://localhost:3000/roads?search=${name}`;
		console.log(`getting road from name: ${name}`);
		let xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.send();
		xhr.onload = function (response) {
			console.log(response);
			return response;
		}
	} else {
		return null;
	}
}
