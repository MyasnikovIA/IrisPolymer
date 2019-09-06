# IrisPolymer

Запуск сервера:
    <pre>d ##class(%ZWebNode.Server).Start(6010,"D:\AppServ\www","index.html","UTF8")</pre>
Открыть в браузере тестовую страницу:
    <pre>http://localhost:6010/csp/user/%25ZWebNode.Lib.Polymer.demoV3.cls</pre>
	
Для получениявсего списка компонентов необходимо  подключить библиотеку 
<pre>
     <!-- Вэб клмпоненты -->
    <script src="/%ZWebNode.Lib.Polymer.v3.webcomponents.lite.cls"></script>
	 <!-- Библиотека компонентов -->
    <script type="module" src="/%ZWebNode.Lib.Polymer.Components.cls"></script>
</pre>
<br/>
%ZWebNode.Lib.Polymer.Components.cls - просканирует область имен и создат на базе классов JavaScript прототипы компонентов
<br/>
%ZWebNode.Lib.Polymer.ExsampleElement - пример создания polymer компонента