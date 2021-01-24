<?php

include 'rest/app/database.php';
$db = new Database();

print 'Połączono z bazą danych<br>';
print 'Test select:<br>';
print '<table>';
$res = $db->select('pm10');
foreach ($res as $row){ 
    echo '<tr><td>'.$row['data_pomiaru'].'</td><td>'.$row['lokalizacja'].'</td><td>'.$row['wartosc'].'</td></tr>';
}
print '</table>';

print 'Test find:<br>';
$record1 = array ( 'date' => '23-01-2021', 'localization' => 'Skawina', 'value' => 200);
$record2 = array ( 'date' => '22-01-2021', 'localization' => 'Skawina', 'value' => 100);
print '<table>';
$res = $db->find('pm10', $record1);
foreach ($res as $row){ 
    echo '<tr><td>'.$row['data_pomiaru'].'</td><td>'.$row['lokalizacja'].'</td><td>'.$row['wartosc'].'</td></tr>';
}
print '</table>';


// print 'Test update:<br>';
// print $db->update('pm10', $record1);
// print $db->update('pm10', $record2);

?>