<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$data = [
		'name' => $_POST['name'],
		'phone' => $_POST['phone'],
		'surname' => $_POST['surname'],
		'email' => $_POST['email'],
	];

	try {
		$connection = new PDO('mysql:host=localhost;dbname=industry-prom', 'root', '');
		$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = 'INSERT INTO clients (name, phone, surname, email) VALUES (:name, :phone, :surname, :email)';
		$statement = $connection->prepare($sql);
		$statement->execute($data);
		echo "Данные успешно отправлены";
	} catch (PDOException $e) {
		echo "Ошибка: " . $e->getMessage();
	}
}
?>
