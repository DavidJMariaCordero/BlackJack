let deck          = [];
const tipos         = ['C', 'D', 'H', 'S'];
const especiales    = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosMaquina = 0;

const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasMaquina = document.querySelector('#maquina-cartas');
const puntosHtml = document.querySelectorAll('small');

const createDeck = () => {
    for (let index = 2; index <= 10; index++){
        for (const tipo of tipos) {
            deck.push( index + tipo);    
        }        
    }
    
    for (const tipo of tipos) {
        for (const especial of especiales) {
            deck.push( especial + tipo);    
        }   
    }

    deck = _.shuffle(deck);
    console.log(deck);
}

const popDeck = () => {
    if(deck.length === 0){
        throw 'No hay cartas';
    }
    return deck.pop();
}

const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length-1);
    return ( isNaN(valor) ) ? 
            (valor === 'A') ? 11 : 10 
            : parseInt(valor);
}

const MachineTurn = (minPoints) => {
    do {
        const carta = popDeck();
        puntosMaquina += valorCarta(carta);
        puntosHtml[1].innerText = puntosMaquina;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasMaquina.append(imgCarta);

        if (minPoints > 21) {
            break;
        }

    } while ((puntosMaquina < minPoints) && minPoints <= 21);

    setTimeout(() => {           
        
        let mensaje = (puntosMaquina === minPoints) ? 'EMPATE :O' 
                    : (puntosMaquina > 21 ) ? 'Haz ganado, Genial!!' 
                    : (puntosJugador > 21) ? 'Gano la maquina'
                    : 'Gano la maquina';
        alert(mensaje);
    }, 1000);
}

createDeck();

btnPedir.addEventListener('click', () => {
    const carta = popDeck();
    puntosJugador += valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        MachineTurn(puntosJugador);
    }else if(puntosJugador === 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        MachineTurn(puntosJugador);
    }
});



btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    MachineTurn(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    deck = createDeck();

    puntosJugador = 0;
    puntosMaquina = 0;

    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;
    
    divCartasJugador.innerHTML = '';
    divCartasMaquina.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})


