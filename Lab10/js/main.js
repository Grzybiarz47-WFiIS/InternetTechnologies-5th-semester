function toMainPage() {
	window.location.href = "index.php";
}
function toDescription() {
    window.location.href = "index.php?sub=Info&action=help";
}
function toBaseContent() {
	window.location.href = "index.php?sub=Base&action=listAll";
}
function addNewContent() {
	window.location.href = "index.php?sub=Base&action=insertRec";
}
function toLogIn() {
	window.location.href = "index.php?sub=Log&action=login";
}
function toRegister() {
	window.location.href = "index.php?sub=Log&action=register";
}
function toLogout() {
	window.location.href = "index.php?sub=Log&action=logout";
}