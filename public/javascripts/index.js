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
			list.style = 'padding: 0; margin: 0;';

			if (data.length == 0) {
				let emptyStr = '<p>Sorry, we found no search results</p>';
				let emptyRoad = document.createElement('li');
				emptyRoad.style = 'list-style-type: none; ';
				emptyRoad.classList.add('empty-road');
				emptyRoad.innerHTML = emptyStr;
				list.appendChild(emptyRoad);
			}
			for (let i = 0; i < data.length; i++) {
				let road = document.createElement('li');
				if (i == data.length - 1)
					road.style = 'list-style-type: none; margin: 0; padding: 0;';
				else
					road.style = 'list-style-type: none; margin: 0; padding: 0; margin-bottom: 1vh;';
				road.classList.add('road-list');
				let str = `
				<div class="card bg-light mb-3" style="width: 100%;">
				<div class="card-header">${(Math.random() * (i + 5)).toFixed(1)} miles away</div>
					<div class="card-body">
						<h5 class="card-title">${data[i]['FULL_NAME']} ${data[i]['LEFTZIP']}
							<a href= "/dataReviews.html" class="btn btn-primary float-right" >Rate Road</a>
						</h5>
					</div>
			  	</div>`;
				road.innerHTML = str;
				list.appendChild(road);
			}
			document.getElementById('information').innerHTML = '';
			document.getElementById('information').appendChild(list);
			document.getElementById('results-card').style = 'display: inherit';
			document.getElementById('results-title').innerHTML = `Showing ${data.length} of ${data.length} results.`;
			return response;
		}
	} else {
		return null;
	}
}
