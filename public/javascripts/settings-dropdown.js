const targetDiv = document.getElementById('drop-down-content');
const gear = document.getElementById('gear-drop-down');
const button = document.getElementById('settings-wheel-click');

function myFunction() {
    document.getElementById('targetDiv').classList.toggle("show");
}

window.onclick = function(e) {
    if (!event.target.matches('targetDiv')) {
        let dropdowns = document.getElementsByClassName("drop-down-content");
        let i;
        for (i = 0; i < dropdowns.length;i++) {
            let openDrowdown = dropdowns[i];
            if (openDrowdown.classList.contains('show')) {
                openDrowdown.classList.remove('show');
            }
        }
    }
}
