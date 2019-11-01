<!doctype html>
<html>
<head>
    <title>Добро пожаловать на главную страницу</title>
    <asset:link rel="icon" href="favicon.ico" type="image/x-ico"/>
    <asset:stylesheet src="application.css"/>
</head>
<body>
    <div class="page home">
        <div class="container">
            ${flash.message}
            <g:form class="form-login" controller="admin" action="login">
                <div class="message-container"></div>
                <div class="form-login-container">
                    <fieldset>
                        <legend>Авторизация пользователя</legend>
                        <p class="clearfix">
                            <label for="username">Имя <em>*</em></label>
                            <input class="fl-rt" type="text" name="username" placeholder="Введите имя">
                        </p>
                        <p class="clearfix">
                            <label for="userpassword">Пароль <em>*</em></label>
                            <input class="fl-rt" type="password" name="userpassword" placeholder="Введите пароль">
                        </p>
                    </fieldset>
                    <div class="btn-submit-container">
                        <button class="btn-submit" type="button">Отправить</button>
                    </div>
                </div>
            </g:form>
        </div>
    </div>
    <asset:javascript src="application.js"/>
</body>
</html>