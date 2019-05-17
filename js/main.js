window.addEventListener('load', function() {
    // Calc Brains 
    const calc     = document.querySelector('.calculator');
    const historyV = document.querySelector('.history-value');
    const outputV  = document.querySelector('.output-value');
    const operator = document.querySelectorAll('.operator');
    const number   = document.querySelectorAll('.number');
    const visual   = document.querySelector('.visual');
    const hide     = document.querySelector('.hide');
    const off      = document.querySelector('.off');
    const colors   = [
        '#65858d',
        '#8d6571',
        '#8d7565',
        '#658d7e',
        '#71658d',
        '#8d8965',
        '#454546',
        '#7eb3a5',
        '#7eb37e',
        '#b15f77'
    ];
    const colorsOP = [
        '#65858da4',
        '#8d6571ad',
        '#8d75659d',
        '#658d7ea2',
        '#71658da8',
        '#8d8965a9',
        '#454546ab',
        '#7eb3a5a2',
        '#7eb37e98',
        '#b15f78ad'
    ];

    // History Field
    getHistory = () => historyV.innerText;
    printHistory = (num) => historyV.innerText = num;


    // Output Field
    getOutput = () => outputV.innerText;
    printOutput = (num) => { 
        if(num == "") {
            outputV.innerText = num;
        }   else {
            outputV.innerText = formatedNumber(num);
        }
    }

    // Adds commas to numbers from 1000 < 
    formatedNumber = (num) => {
        if(num == '-') {
            return '';
        }

        const n = Number(num);
        const value = n.toLocaleString("en")

        return value;
    }

    // Removes commas 
    reverseFormatedNumber = (num) => Number(num.replace(/,/g,''));

    // Operations 
    operator.forEach(sign => {
        sign.addEventListener('click', function() {
            // Clears calc completly
            if(this.id == 'clear') {
                printHistory('');
                printOutput('');
            } else {
                let output = getOutput();
                let history = getHistory();

                if(output == "" && history != "") {
                    if(isNaN(history[history.length-1])) {
                        history = history.substr(0 , history.length-1);
                    }
                }

                if(output != '' || history != '') {
                    output = output == '' ? 
                    output:reverseFormatedNumber(output);
                    history = history + output;
                    
                    if(this.id == '=') {
                        const result = eval(history);
                        printOutput(result);
                        printHistory('');
                    } else {
                        history = history + this.id;
                        printHistory(history);
                        printOutput('')
                    }
                }
            }
        });
    });

    number.forEach((num, index) => {
        num.addEventListener('click', function() {
            var output = reverseFormatedNumber(getOutput());

            if(output !=NaN){
                output = output + this.id;
                printOutput(output);
            }

            const bubble = document.createElement('div');

            visual.appendChild(bubble);
            bubble.style.backgroundColor = colors[index];
            bubble.style.boxShadow = `0 0 0 6px ${colorsOP[index]}`;
            bubble.style.animation = 'jump 1s ease';
            bubble.innerText = this.id;
            bubble.addEventListener('animationend', function() {
                visual.removeChild(this);
            });
        });
    });

    // Hide or Show Calculator
    hide.addEventListener('click' , function() {
        if (calc.style.display === 'none') {
            calc.style.display = 'block';
            this.innerText = 'Hide Calculator';
        } else {
            calc.style.display = 'none';
            this.innerText = 'Show Calculator';
        }
    });

    // Toggle on/off animation balls
    off.addEventListener('click' , function() {
        if(visual.style.visibility === 'hidden') {
            alert('Animation turned on!');
            visual.style.visibility = 'visible';
            this.innerText = 'Animation: ON';
        } else {
            visual.style.visibility = 'hidden';
            alert('Animation turned off!')
            this.innerText = 'Animation: OFF';
        }
    });
}); 