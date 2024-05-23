function skillsMember() {
    var member = document.getElementById("member");
    var member = member.value;
    if (member == "") {
        document.getElementById("msgmember").innerHTML = "Please enter member name";
        return false;
    }
    else {
        document.getElementById("msgmember").innerHTML = "";
        return true;
    }
}