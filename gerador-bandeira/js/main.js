ctx = c.getContext("2d");

bandeiraCustomizada = new Image();

bandeiraCustomizada.onload = () => {
    c.width = 500;
    c.height = 500;
    render();
};

bandeiraCustomizada.src = "bandeira.png";

p.oninput = nome.oninput = cor.oninput = saturacao.oninput = luminosidade.oninput = render;

function render() {
    let {cor, saturacao, luminosidade, nome, causa} = getFormData();
    setInitialImage();
    setLuminosidade(luminosidade)
    setSaturacao(saturacao)
    setCor(cor)
    setText(nome, causa);
    setImage();
}

function drawTextAlongImageArc(context, config) {
    let {text, centerX, centerY, radius, angle} = config;
    context.save();
    context.translate(centerX, centerY);
    context.rotate(-1 * angle / 2);
    context.rotate(-1 * (angle / text.length) / 2);
    for (let i = 0; i < text.length; i++) {
        context.rotate(angle / text.length);
        context.save();
        context.translate(0, -1 * radius);
        context.fillText(text[i], 0, 0);
        context.restore();
    }
    context.restore();
}

function getFormData() {
    return {
        cor: cor.value,
        saturacao: saturacao.value,
        luminosidade: luminosidade.value,
        nome: nome
            .value
            .toUpperCase(),
        causa: null
    }
}

function setLuminosidade(luminosidade) {
    ctx.globalCompositeOperation = luminosidade < 100
        ? "color-burn"
        : "color-dodge";

    luminosidade = luminosidade >= 100
        ? luminosidade - 100
        : 100 - (100 - luminosidade);
    ctx.fillStyle = "hsl(0, 50%, " + luminosidade + "%)";
    ctx.fillRect(0, 0, c.width, c.height);
}

function setInitialImage() {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(bandeiraCustomizada, 0, 0, c.width, c.height);
}

function setClip() {
    ctx.globalCompositeOperation = "destination-in";
    ctx.globalCompositeOperation = "source-over";
    ctx.font = "50px Roboto Mono, monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
}

function setSaturacao(saturacao) {
    ctx.globalCompositeOperation = "saturation";
    ctx.fillStyle = "hsl(0," + saturacao + "%, 50%)";
    ctx.fillRect(0, 0, c.width, c.height);
}

function setCor(cor) {
    ctx.globalCompositeOperation = "hue";
    ctx.fillStyle = "hsl(" + cor + ",1%, 50%)";
    ctx.fillRect(0, 0, c.width, c.height);
}

function setImage() {
    const bandeira = document.getElementById('bandeira-customizada')
    bandeira.src = c.toDataURL();
    c.style.display = "none";
}

function setText(text, causa) {
    setClip();
    const antiFascista = "ANTIFASCISTA" + ((p.checked)
        ? 'S'
        : '')
    causa = causa
        ? causa
        : antiFascista;
    const configTextCausa = {
        centerX: (c.width / 2) - 0,
        centerY: c.height - 260,
        angle: -(causa.length / 7),
        radius: -225,
        text: causa
    }
    const configText = {
        centerX: (c.width / 2) - 0,
        centerY: c.height - 245,
        angle: text.length / 7,
        radius: 185,
        text
    }
    drawTextAlongImageArc(ctx, configTextCausa);
    drawTextAlongImageArc(ctx, configText);
}


function saveImage() {
    let link = document.getElementById('link');
    link.setAttribute('download', 'bandeira.png');
    link.setAttribute('href', c.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}