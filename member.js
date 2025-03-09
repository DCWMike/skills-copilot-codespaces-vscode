function skillsMember() {
    const member = document.getElementById("member");
    const memberValue = member.options[member.selectedIndex].value;
    if (memberValue === "1") {
        document.getElementById("skillsMember").style.display = "none";
    } else {
        document.getElementById("skillsMember").style.display = "block";
    }
}