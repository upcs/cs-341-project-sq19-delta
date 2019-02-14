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
			// document.getElementById('information').innerHTML = this.responseText;
			let data = JSON.parse(this.responseText);
			let list = document.createElement('ul');
			for (let i = 0; i < data.length; i++){
				let road = document.createElement('li');
				// let roadbutton = document.createElement('button');
				road.classList.add('road-list');
				// roadbutton.classList.add('button-list');
				// road.innerHTML = data[i]['FULL_NAME'] + ' ' + data[i]['LEFTZIP'];
				// list.append(roadbutton);
				let str = `<div class="card" style="width: 70vw;">
				<div class="card-body">
				  <h5 class="card-title">${data[i]['FULL_NAME']} ${data[i]['LEFTZIP']}</h5>
				  <a href= "/dataReviews.html" class="btn btn-primary">Rate Road</a>
				</div>
			  </div>`;
			  road.innerHTML = str;
			  list.appendChild(road);
			}
			document.getElementById('information').appendChild(list);

			return response;
		}
	} else {
		return null;
	}
}
