var jogadores= [];

var numeros_sorteados = [];

function criarCartela(jogador)
{
    gerarCartela();

    //seleciono onde quero criar as coisas
    const pai_div_cartela = document.getElementById('body_cartelas');
    //crio uma div para minha cartela
    const div_cartela = document.createElement('div');
    div_cartela.className = 'cartela';
    //Insiro a div dentro do pai
    pai_div_cartela.appendChild(div_cartela);


    //criar um elemento de texto para o nome do jogador

    const h4_jogador = document.createElement('h4');
    
    h4_jogador.innerText = jogador.nome;

    //Inserir o nome do Jogador na div
    div_cartela.appendChild(h4_jogador);

    //criar a tabela do bingo
    const tabela = document.createElement('table');

    const thead = document.createElement('thead');

    const tbody = document.createElement('tbody');


    //Inserir na tabela
    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    //criando os elementos do thead
    const thB = document.createElement('th');
    const thI = document.createElement('th');
    const thN = document.createElement('th');
    const thG = document.createElement('th');
    const thO = document.createElement('th');


    thB.innerText = 'B';
    thI.innerText = 'I';
    thN.innerText = 'N';
    thG.innerText = 'G';
    thO.innerText = 'O';

    //inserir os th no thead

    thead.appendChild(thB);
    thead.appendChild(thI);
    thead.appendChild(thN);
    thead.appendChild(thG);
    thead.appendChild(thO);

    for(var i = 0; i<5; i++)
    {
        const tr = document.createElement('tr');
        for(var j = 0; j<5; j++)
        {
            const td = document.createElement('td');
            td.innerText = jogador.cartela[j][i];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    //Inserir na tabela
    tabela.appendChild(thead);
    tabela.appendChild(tbody);


    div_cartela.appendChild(tabela);

}



function gerarColuna(quantidade,inicio,fim)
{
    var coluna = [];

    while(coluna.length < quantidade)
    {
        var aleatorio = Math.floor(Math.random()*(fim - inicio) + inicio) ;
        if(!coluna.includes(aleatorio))
        {
            coluna.push(aleatorio);
        }
    }

    return coluna;
}

function gerarCartela()
{
    var cartela = [gerarColuna(5,1,15), gerarColuna(5,16,30), gerarColuna(5,31,45), gerarColuna(5,46,60),gerarColuna(5,61,75)];
    
    return cartela;
}

function inscreverJogador()
{
    const nome = prompt('Digite o nome do jogador:');

    if(nome.length < 3 )
    {
        alert('Nome precisa ter mais de 3 caracteres');
        return;
    }

    const cartela = gerarCartela();

    const jogador = {
        nome: nome,
        cartela : cartela
    }

    jogadores.push(jogador);

    criarCartela(jogador);
}

function jogar()
{
    if (jogadores.length < 2) 
    {
     alert('É preciso haver pelo menos 2 jogadores!')   
     return;
    }

    const intervalo = setInterval(function(){
        

        while(true)
        {
            var aleatorio = Math.floor(Math.random()*75 + 1);
            if(!numeros_sorteados.includes(aleatorio))
            {
                numeros_sorteados.push(aleatorio);
                break;
            }
        }

        const body_numeros = document.getElementById('body_numeros');

        const span = document.createElement('span');
        span.innerText = aleatorio;

        body_numeros.appendChild(span);
        //Conferir Jogo
        conferirJogo(aleatorio);

    }, 1000)
}

function conferirJogo(sorteado)
{
    var numeros_cartelas = document.getElementsByTagName('td');

    for (let i = 0; i < numeros_cartelas.length; i++) 
    {
        if (numeros_cartelas[i].innerText == sorteado) 
        {
            numeros_cartelas[i].style.backgroundColor = 'lawngreen'
        }
        
    }
}