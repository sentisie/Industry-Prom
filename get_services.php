<?php
     try {
         $connection = new PDO('mysql:host=localhost;dbname=industry-prom', 'root', '');
         $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

         $sql = 'SELECT * FROM services';
         $statement = $connection->prepare($sql);
         $statement->execute();

         $services = $statement->fetchAll(PDO::FETCH_ASSOC);
         echo json_encode($services);
     } catch (PDOException $e) {
         echo json_encode(['error' => $e->getMessage()]);
     }
     ?>