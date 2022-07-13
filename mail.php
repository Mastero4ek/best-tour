<?php
// Файлы phpmailer
require 'php-mailer/PHPMailer.php';
require 'php-mailer/SMTP.php';
require 'php-mailer/Exception.php';

$json = file_get_contents('php://input');
$obj = json_decode($json, true);

$name = $obj['name'];
$tel = $obj['tel'];
$text = $obj['message'];

// Формирование самого письма
$title = "Mail title";

$body = " <h2>New mail</h2>
  <tr style='background-color: #f8f8f8;'>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Name: </b>$name</td>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Phone: </b>$tel</td>
    <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>Message: </b>$text</td>
  </tr>
  ";
$body = "<table style='width: 100%;'>$body</table>";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = "UTF-8";
  $mail->SMTPAuth   = true;
  // $mail->SMTPDebug = 2; 
  $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

  // Настройки вашей почты
  $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username   = 'slavachirkov92@gmail.com'; // Логин на почте
  $mail->Password   = ''; // Пароль 
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('slavachirkov92@gmail.com', 'Вячеслав Чирков-Панин'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('slavachirkov92@gmail.com');
  $mail->addAddress('slavachirkov92@mail.ru');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
  $result = "error";
  $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "status" => $status]);
