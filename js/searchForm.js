document.getElementById('search-button').addEventListener('click', () => {
	let streetName = document.getElementById('street-name').value;
	console.log(`User searched for street: ${streetName}.`);
});
