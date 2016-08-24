(function() {

	var contestants = [];

	var btn = document.querySelector("#getRandom"),
		output = document.querySelector("#showRandom"),
		addBtn = document.querySelector("#addBtn"),
		input = document.querySelector("#addContestant"),
		randomNumber = null;

	function findRandom(arr) {
		var outputNumber = Math.round(Math.random() * (arr.length - 1));

		if (randomNumber === outputNumber) {
			findRandom(arr);
		} else {
			randomNumber = outputNumber;
		}
	}

	function handleAlert(display, info, elClass) {
        var alert = document.querySelector("#alert");

        if (display === "hide") {

        	alert.classList.remove("alert-danger");
    		alert.classList.add("hidden-xs-up");

        } else if (display === "show") {

        	alert.classList.remove("hidden-xs-up");
	        alert.classList.remove("alert-danger");
	        alert.classList.add(elClass);
	        alert.textContent = info;

        }
      }

	function showRandom() {
		handleAlert("hide");

		var isValid = isNotEmpty(contestants.length);

		if (!isValid) {

			handleError("show", "First add contestants", "alert-danger");
			return;

		} else {

			findRandom(contestants);
			output.value = contestants[randomNumber];

		}
	}

	function isNotEmpty(val) {
		return !!val;
	}

    function showContestants(contestants) {

    	var ul = document.querySelector("#contestants ul");

    	ul.parentNode.classList.remove("hidden-xs-up");
    	ul.innerHTML = "";

    	contestants.forEach(function(contestant) {

    		li = document.createElement("li");

    		li.textContent = contestant;
    		ul.appendChild(li);

    	});
    }

	function addContestant(e) {
		handleAlert("hide");

		e.preventDefault();

		var contestant = input.value,
			isValid = isNotEmpty(contestant);

		if (!isValid) {
			handleAlert("show", input.dataset.error, "alert-danger")
		} else {
			contestants.push(contestant);
			handleAlert("show", "Contestant successfully added!", "alert-success");

			input.value = "";
			showContestants(contestants);
		}
	}

	btn.onclick = showRandom;

	addBtn.onclick = showContestants;
	addBtn.onclick = addContestant;

})();










