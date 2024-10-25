function DigitalInputsButton({ pinNum }) {

    const onButtonClick = () => {
        console.log(pinNum);
        const requestOptions = {
            mode: 'no-cors',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin: pinNum, state: 1 })
        };
        fetch('http://195.69.76.135:8082/api/write-pin', requestOptions)
            .then((response) => {
                console.log("response.status =", response.status);
        });
    }
    return (
        <button class="digital-input-button" onClick={onButtonClick}></button>
    );
}

export default DigitalInputsButton;