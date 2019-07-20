var stringy 
function uploadFile(dataObject, file) {
	alert("Please wait while we process your level!")
	var url = 'https://api.cloudinary.com/v1_1/obliv-cf/auto/upload';
	var xhr = new XMLHttpRequest();
	var fd = new FormData();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	/*
		// Reset the upload progress bar
		document.getElementById('progress').style.width = 0;
		// Update progress (can be used to show progress indicator)
		xhr.upload.addEventListener("progress", function(e) {
			var progress = Math.round((e.loaded * 100.0) / e.total);
			document.getElementById('progress').style.width = progress + "%";

			console.log(`fileuploadprogress data.loaded: ${e.loaded},
		data.total: ${e.total}`);
		});
	*/
	xhr.onreadystatechange = function (e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// File uploaded successfully
			var tmp = dataObject;
			var response = JSON.parse(xhr.responseText);
			var url = response.secure_url;
			tmp.info.path = url;
			mapStruct = tmp;
			async function getUserAsync() {
				let response = await fetch('https://www.jsonstore.io/3e671511c12832dbd8f691648bfaecd3d50b92ef4fdd3986a6bc9e09bee56191/maps');
				let data = await response.json()
				return data;
			}
			getUserAsync()
				.then(function (data) {
					console.log(data)
					var map = data.result
					map.push(mapStruct)
					fetch('https://www.jsonstore.io/3e671511c12832dbd8f691648bfaecd3d50b92ef4fdd3986a6bc9e09bee56191/maps', {
						headers: {
							'Content-type': 'application/json'
						},
						method: 'POST',

						body: JSON.stringify(map),
					});

					alert("Your map was uploaded to the commnunity levels!")
				});








			//END IF



		}
	};

	fd.append('upload_preset', "ivu0b1k5");
	fd.append('tags', 'browser_upload');
	fd.append('file', file);
	xhr.send(fd);
}

function compileJSON(dataObject, audio) {
	return uploadFile(dataObject, audio);
}