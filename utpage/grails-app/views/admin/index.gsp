<!doctype html>
<html>
<head>
    <title>Добро пожаловать на административную страницу</title>
    <asset:link rel="icon" href="favicon.ico" type="image/x-ico"/>
    <asset:stylesheet src="application.css"/>
</head>
<body>
    <div class="page admin">
        <div class="container">
            <h1>Приветствую! Вы в админке</h1>
            <p>Пользователь: ${session.user} | <g:link controller="admin" action="logout">Logout</g:link></p>
            <p>s1</p>
        </div>
    </div>
    <asset:javascript src="application.js"/>
</body>
</html>