function search() {
	let name = 'Strong';
	if (name !== null) {
		let url = 'http://localhost:3000/roads';
		console.log(`getting road from name: ${name}`);
		let xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.send('Strong');
		xhr.onload = function (response) {
			console.log(response);
			return response;
		}
	} else {
		return null;
	}
}
