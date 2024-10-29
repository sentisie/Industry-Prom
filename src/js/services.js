document.addEventListener("DOMContentLoaded", function () {
	fetch("get_services.php")
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const container = document.getElementById("services-container");
			container.innerHTML = "";

			if (data.length === 0) {
				document.querySelector(".cards").style.margin = "60px 0 20px 0";
				container.innerHTML =
					"<p class='description not-services'>Нет доступных услуг</p>";
			} else {
				data.forEach((service) => {
					const card = document.createElement("div");
					card.classList.add("card");
					card.innerHTML = `
			  <img src="${service.image}" alt="card" />
			  <div class="card-wrap">
				 <p class="card__text">${service.title}</p>
				 <div class="btn-container">
					<a href="us-projects.html">
					  <button class="card-btn">ПОДРОБНЕЕ</button>
					</a>
				 </div>
			  </div>
			`;
					container.appendChild(card);
				});
			}
		});
});
