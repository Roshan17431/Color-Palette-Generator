document.addEventListener('DOMContentLoaded', function() {
    const rangeInput = document.getElementById("colorCount");
    const countLabel = document.getElementById("countLabel");

    rangeInput.addEventListener("input",()=>{
        countLabel.textContent = rangeInput.value;
    });

    function getRandomColor(){
        const letters = 'ABCDEF123456789'
        let color = '#';
        for (let i=0; i<6 ; i++){
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function hexToHSL(){
        // Convert hex to RGB first
        let r=0, g=0, b=0;
        if (hex.length == 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length == 7) {
            r = parseInt(hex[1] + hex[2], 16);
            g = parseInt(hex[3] + hex[4], 16);
            b = parseInt(hex[5] + hex[6], 16);
        }
        // RGB to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;


    }

});


