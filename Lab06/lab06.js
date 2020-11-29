function nameCheck()
{
    var emptyAlert = "Pole nie może być puste!";
    var emailAlert = "Błędny format adresu email!";
    var result = true;

    document.getElementById("alert1").innerHTML = "";
    document.getElementById("alert2").innerHTML = "";
    document.getElementById("alert3").innerHTML = "";
    document.getElementById("alert4").innerHTML = "";

    if(document.insertData.firstName.value == "")
    {
        document.getElementById("alert1").innerHTML = emptyAlert;
        result = false;
    }
    if(document.insertData.lastName.value == "")
    {
        document.getElementById("alert2").innerHTML = emptyAlert;
        result = false;
    }
    if(document.insertData.email.value == "")
    {
        document.getElementById("alert3").innerHTML = emptyAlert;
        result = false;
    }
    else if(document.insertData.email.value.indexOf("@") == -1)
    {
        document.getElementById("alert3").innerHTML = emailAlert;
        result = false;
    }
    if(document.insertData.selectYear.value == "0")
    {
        document.getElementById("alert4").innerHTML = emptyAlert;
        result = false;
    }
    return result;
}
