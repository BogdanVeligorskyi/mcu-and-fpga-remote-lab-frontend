function DigitalInputsGen() {
    return(
        <div>
            <button class="digital-input-turn-off"/>
                <input type="number" class="digital-input-duty-value" value="50"/>
                Duty, %
                <input type="number" class="digital-input-frequency-value" value="10"/>
                Freq, kHz
        </div>
    );
}

export default DigitalInputsGen;