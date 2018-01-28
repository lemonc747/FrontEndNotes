### test
XMLHttpRequest和Fetch API

#### XMLHttpRequest
- var request = new XMLHttpRequest();
- request.open(type, url);
- request.responseType = "text...";
- request.onload = function(){
    var result = request.response;
}
- request.send();

#### Fetch
fetch()