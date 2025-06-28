document.addEventListener('DOMContentLoaded', function() {
    const rangeInput = document.getElementById("colorCount");
    const countLabel = document.getElementById("countLabel");
    const colorMode = document.getElementById("colorMode");
    const baseColor = document.getElementById("baseColor");
    const generateBtn = document.getElementById("generateBtn");
    const randomColorBtn = document.getElementById("randomColor");
    const parent = document.getElementById("parent");

    randomColorBtn.addEventListener("click",()=>{
        baseColor.value = getRandomColor();
    });
    generateBtn.addEventListener("click",generatePalette);

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
    function hexToHSL(hex){
        // Convert hex to RGB first
        let r=0, g=0, b=0;
        if (hex.length == 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } 
        else if (hex.length == 7) {
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
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0);
                     break;
                case g: h = (b - r) / d + 2; 
                    break;
                case b: h = (r - g) / d + 4; 
                    break;
            }
            h /= 6;
        }

        return [h * 360, s * 100, l * 100];
    }
    function HSLToHex(h, s, l) {
        s /= 100;
        l /= 100;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c/2,
            r = 0,
            g = 0,
            b = 0;

        if (0 <= h && h < 60) {
            r = c; g = x; b = 0;
        } else if (60 <= h && h < 120) {
            r = x; g = c; b = 0;
        } else if (120 <= h && h < 180) {
            r = 0; g = c; b = x;
        } else if (180 <= h && h < 240) {
            r = 0; g = x; b = c;
        } else if (240 <= h && h < 300) {
            r = x; g = 0; b = c;
        } else if (300 <= h && h < 360) {
            r = c; g = 0; b = x;
        }
        
        
        r = Math.round((r + m) * 255).toString(16);
        g = Math.round((g + m) * 255).toString(16);
        b = Math.round((b + m) * 255).toString(16);

        
        if (r.length == 1){
            r = "0" + r;
        }
        if (g.length == 1){
             g = "0" + g;
        }
        if (b.length == 1){
             b = "0" + b;
        }

        return "#" + r + g + b;
    }
    function generatePalette(){
        const count = parseInt(rangeInput.value);
        const mode = colorMode.value;
        const baseHex = baseColor.value;
        const [h,s, l] = hexToHSL(baseHex);

        let colors = [];

        switch(mode){
            case 'analogous':
                
                for (let i = 0; i < count; i++) {
                    const newH = (h + (i * 30) - (count * 15)) % 360;
                    colors.push(HSLToHex(newH < 0 ? newH + 360 : newH, s, l));
                }
                break;
                
            case 'monochromatic':
                
                for (let i = 0; i < count; i++) {
                    const newL = l + ((i - Math.floor(count / 2)) * (80 / count));
                    const adjustedL = Math.max(10, Math.min(90, newL));
                    colors.push(HSLToHex(h, s, adjustedL));
                }
                break;
                
            case 'triadic':
                
                for (let i = 0; i < count; i++) {
                    const newH = (h + (i * 120)) % 360;
                    colors.push(HSLToHex(newH, s, l));
                }
                break;
                
            case 'complementary':
                
                for (let i = 0; i < count; i++) {
                    const newH = (h + (i * 180)) % 360;
                    colors.push(HSLToHex(newH, s, l));
                }
                break;
                
            case 'random':
                
                for (let i = 0; i < count; i++) {
                    colors.push(getRandomColor());
                }
                break;

        }
        if (mode !== 'random') {
            colors.sort((a, b) => {
                const [h1] = hexToHSL(a);
                const [h2] = hexToHSL(b);
                return h1 - h2;
            });
        }
        displayPalette(colors);
    }
    function displayPalette(colors) {
        
        parent.innerHTML = '';
        colors.forEach((color) => {
            const colorBox = document.createElement("div")
            colorBox.className = "color-box";
            colorBox.style.height = "180px";
            colorBox.style.backgroundColor = '#fff';
            colorBox.style.borderRadius = "10px";
            colorBox.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            colorBox.style.overflow = 'hidden';
            colorBox.style.display = 'flex';
            colorBox.style.flexDirection = 'column';
            colorBox.style.justifyContent = 'space-between';

            const colorDisplay = document.createElement('div');
            colorDisplay.style.height = '70%';
            colorDisplay.style.backgroundColor = color;

            const infoBox = document.createElement('div');
            infoBox.style.display = 'flex';
            infoBox.style.justifyContent = 'space-between';
            infoBox.style.alignItems = 'center';
            infoBox.style.padding = '10px';

            const hexText = document.createElement('span');
            hexText.textContent = color.toUpperCase();
            hexText.style.fontFamily = 'monospace';
            hexText.style.fontSize = '14px';

            const copyBtn = document.createElement('button');
            copyBtn.textContent = 'Copy';
            copyBtn.style.border = 'none';
            copyBtn.style.backgroundColor = 'transparent';
            copyBtn.style.cursor = "pointer";
            copyBtn.style.color = "#6b7280"; 
            copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
            copyBtn.title = 'Copy to clipboard';
            copyBtn.style.fontSize = '16px';
            copyBtn.style.transition = "color 0.3s ease";

            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(color);
                showToast('Color copied to clipboard!');
            });

            copyBtn.addEventListener('mouseover', () => {
                copyBtn.style.color = "#374151"; 
            });
            copyBtn.addEventListener('mouseout', () => {
                copyBtn.style.color = "#6b7280"; 
            });
            
            



            colorBox.appendChild(colorDisplay);
            parent.appendChild(colorBox);
            colorBox.appendChild(infoBox);
            infoBox.appendChild(hexText);
            infoBox.appendChild(copyBtn);
            
        })
        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.remove();
            }, 2500);
        }
        
    }


});


