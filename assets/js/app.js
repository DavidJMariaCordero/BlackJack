const miModulo = (() => {
    'use strict'

    let deck          = [];
    const tipos         = ['C', 'D', 'H', 'S'];
    const especiales    = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    const btnNuevo = document.querySelector('#btnNuevo');
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');

    const divCartasJugadores = document.querySelectorAll('.divCartas');
    const puntosHtml = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 1) => {
        deck = createDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores + 1; i++) {
            puntosJugadores.push(0);            
        }
        puntosHtml.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '')

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const createDeck = () => {
        deck = [];
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

        return _.shuffle(deck);
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

    const acumularPuntos = (turno, carta) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return  puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () =>{
        const [minPoints, puntosMaquina] = puntosJugadores;
        
        setTimeout(() => {           
            
            let mensaje = (puntosMaquina === minPoints) ? 'EMPATE :O' 
                        : (puntosMaquina > 21 ) ? 'Haz ganado, Genial!!' 
                        : (minPoints > 21) ? 'Gano la maquina'
                        : 'Gano la maquina';
            alert(mensaje);
        }, 1000);
    }
    const MachineTurn = (minPoints) => {
        let puntosMaquina = 0 
        do {
            const carta = popDeck();
            puntosMaquina = acumularPuntos(puntosJugadores.length - 1, carta);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosMaquina < minPoints) && minPoints <= 21);

        determinarGanador();
    }


    btnPedir.addEventListener('click', () => {
        const carta = popDeck();
        const puntosJugador= acumularPuntos( 0 ,carta );
        crearCarta(carta, 0);

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
        MachineTurn(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    })

    return{
        nuevoJuego: inicializarJuego
    };

})();




