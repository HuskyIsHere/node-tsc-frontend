const FocusButton = (props) => {

    const divId = props.divId
    const btnText = props.btnText

    function focusDiv(divId) {
        const divs = document.getElementsByClassName("focusable")
        Array.from(divs).forEach((div, idx) => {
            const d = document.getElementById(div.id)
            if (divId == div.id) {
                d.style.display = "block"
            } else {
                d.style.display = "none"
            }
        })
    }

    return (
        <button onClick={() => focusDiv(divId)}>
            {btnText}
        </button>
    )
}

export default FocusButton;
