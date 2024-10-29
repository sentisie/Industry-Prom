$(document).ready(function () {
	function validateForm() {
		var isValid = true;
		$("#form input").each(function () {
			if ("" === $(this).val()) return (isValid = false), false;
		});
		$("#btn").prop("disabled", !isValid);
	}

	$("#form input").on("input", function () {
		validateForm();
	});

	$("#form").submit(function (event) {
		event.preventDefault();
		var isValid = true,
			namePattern = /^[a-zA-Zа-яА-Я\s]+$/;
		$("input").removeClass("error");

		var name = $('[name="name"]').val();
		if (!namePattern.test(name)) {
			$('[name="name"]').addClass("error");
			console.log("Invalid name");
			isValid = false;
		}

		var surname = $('[name="surname"]').val();
		if (!namePattern.test(surname)) {
			$('[name="surname"]').addClass("error");
			console.log("Invalid surname");
			isValid = false;
		}

		var phone = $('[name="phone"]').val();
		if (!/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(phone)) {
			$('[name="phone"]').addClass("error");
			console.log("Invalid phone");
			isValid = false;
		}

		if (!$('[name="email"]').val()) {
			$('[name="email"]').addClass("error");
			console.log("Invalid email");
			isValid = false;
		}

		if (isValid) {
			console.log("Sending AJAX request");
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: $(this).serialize(),
			})
				.done(function () {
					console.log("AJAX request successful");
					$(".modal__container").html(
						"<h3>Спасибо! Ваши данные успешно отправлены.</h3>"
					);
					$(".modal__content").addClass("answer");
					$("body").addClass("no-scroll");
					$("#form").find("input").val("");
					$("#form").trigger("reset");
					validateForm();
				})
				.fail(function () {
					console.log("AJAX request failed");
					$(".modal__container").html(
						"<h3>Произошла ошибка при отправке данных. Пожалуйста, попробуйте позже.</h3>"
					);
					$(".modal__content").addClass("answer");
					$("body").addClass("no-scroll");
				});
		} else {
			console.log("Form validation failed");
		}
	});

	validateForm();
});
