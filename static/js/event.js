window.addEventListener('resize', () => {
    _setPositionShoppingBasketCircle()
})

window.onpopstate = (event) => {
    alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
}