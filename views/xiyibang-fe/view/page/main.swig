<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<div class="wr-app">
    <div id="app">
        <div id="loading" class="loading">Loading...</div>
    </div>
</div>
{% require 'xiyibang-fe:lib/mod.js' %}
<script >
    let app=require("xiyibang-fe:view/page/main")
    app.init({{JSON.stringify(tplData)}})
</script>
</body>
</html>