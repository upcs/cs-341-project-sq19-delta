function search() {
	let name = document.getElementById('street-name').value;

	if (name == '') {
		console.log("Nothing as input");
		return;
	}

	if (name !== null) {
		let url = `http://localhost:3000/roads?search=${name}`;
		console.log(`getting road from name: ${name}`);
		let xhr = new XMLHttpRequest();
		xhr.open('POST', url, true);
		xhr.send();
		xhr.onload = function (response) {
			console.log(response);
			// document.getElementById('information').innerHTML = this.responseText;
			let data = JSON.parse(this.responseText);

			let list = document.createElement('ul');

			if (data.length == 0) {
				let emptyStr = '<p>Sorry, we found no search results</p>';
				let emptyRoad = document.createElement('li');
				emptyRoad.style = 'list-style-type: none;';
				emptyRoad.classList.add('empty-road');
				emptyRoad.innerHTML = emptyStr;
				list.appendChild(emptyRoad);
			}
			for (let i = 0; i < data.length; i++) {
				let road = document.createElement('li');
				road.style = 'list-style-type: none; margin-bottom: 1vh;';
				road.classList.add('road-list');
				let str = `
				<div class="card text-white bg-dark mb-3" style="width: 70vw;">
				<div class="card-header">${(Math.random() * (i + 5)).toFixed(1)} miles away</div>
					<div class="card-body">
						<h5 class="card-title">${data[i]['FULL_NAME']} ${data[i]['LEFTZIP']}</h5>
				  		<a href= "/dataReviews.html" class="btn btn-light">Rate Road</a>
					</div>
			  	</div>`;
				road.innerHTML = str;
				list.appendChild(road);
			}
			document.getElementById('information').innerHTML = '';
			document.getElementById('information').appendChild(list);
			return response;
		}
	} else {
		return null;
	}
}
