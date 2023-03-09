function selecionarBotao(buttom){
    var buttoms = document.querySelectorAll(".selectButtoms");

    buttoms.forEach(function(b) {
        b.classList.remove("selecionado");
    });

    buttom.classList.add("selecionado");
}

// -------------------------- Verificação clique cdb ou LCA ---------------------------------

cdb_on = 0;
lca_on = 0;

function click_cdb(){
    cdb_on = 1;
    lca_on = 0;
}

function click_lca(){
    cdb_on = 0;
    lca_on = 1; 
}

//------------------------- API Taxa Selic Hoje ------------------------------------------
let dateToday = new Date();
let day = dateToday.getDate();
let month = dateToday.getMonth();
let year = dateToday.getFullYear();

let url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.4189/dados?formato=json&dataInicial=${day}/${month}/${year}&dataFinal=${day}/${month}/${year}`

fetch(url)
    .then(response => response.json())
    .then(data => data.forEach(obj => {
        taxaSelicHoje = obj.valor;
        document.getElementById("taxaSelic").value = taxaSelicHoje;
    }))
        
    // .then(data => {
    //     console.log(data.length)
    //     for(let i = 0; i <= data.length; i++){
    //         console.log(data[i].valor);
    //     }

        // data.forEach(obj => console.log(obj.valor));

        // data.forEach(batata => {
        //     // if(batata.valor >= 8){
        //     //     console.log(batata.valor)
        //     // }

        //     // console.log(batata.valor.includes(batata.valor > 8))
        // })

        // forma pedro (melhor solução!!!!)
        // const valoresMaioresQue8 = data.filter(obj => obj.valor > 8);
        // valoresMaioresQue8.forEach(obj => {
        //     let array = [];
        // });

    // }) 

// ------------------------ Dias Uteis ------------------------------------

async function dias_uteis(data_inicial, data_final){
    const url = `https://calendarific.com/api/v2/holidays?api_key=428349b1535465365b8f45e73cc061ea9a65cd7e&country=br&year=2023`;

    fetch(url)
        .then(reponse => response.json())
        .then(feriados => { 
            const datasFeriados = feriados.response.feriados()
        })

    const datasFeriados = feriados.response.feriados.map(feriado => new Date(feriado.date.iso)); /* iso é a data */

    data_inicial = new Date(data_inicial.getFullYear(), data_inicial.getMonth(), data_inicial.getDate());
    data_final = new Date(data_final.getFullYear(), data_final.getMonth(), data_final.getDate());

    let dias_util = 0;
    let data_atual = data_inicial;

   while(data_atual <= data_final) {
    if(data_atual.getDay() !== 0 && data_atual.getDay() !== 6 && !datasFeriados.includes(data_atual)){
        dias_util++; /* Se não for fim de semana ou feriado irá incrementar +1 ao dia útil */
    }
    data_atual.setDate(data_atual.getDate()+1);
   }
   return dias_util;
}

console.log(dias_uteis(new Date("2023-03-01"), new Date("2023-05-09")));
//------------------------ Calculo do Resultado -----------------------------------------------

function taxaEquivalente(){
    let cdi = taxaSelic - 0.1;
    let taxaAno = (cdi/100)*(taxaDi/100);
    let taxaDiaria = (1+taxaAno)**(1/360)-1;

    return taxaDiaria // formato = 0.x
}

function defIr(){
    let data1 = new Date(dataCompra);
    let data2 = new Date(dataFinal);
    let diferencaData = Math.abs((data1 - data2)/86400000);

    if(diferencaData <= 180){
        var ir = 22.5;
    }

    if(diferencaData > 180 && diferencaData < 360){
        var ir = 20;
    }

    if(diferencaData > 360 && diferencaData < 720){
        var ir = 17.5;
    }

    if(diferencaData > 720){
        var ir = 15;
    }

    var dataIr = [diferencaData, ir];

    return dataIr
}

function calculoLucro(){
    investimento = parseFloat(document.querySelector('#investimento').value);
    taxaSelic = parseFloat(document.querySelector('#taxaSelic').value);
    taxaDi = parseFloat(document.querySelector('#taxaDi').value);
    dataCompra = document.querySelector('#dataCompra').value;
    dataFinal = document.querySelector('#dataFinal').value;

    // console.log(investimento, taxaSelic, taxaDi, dataCompra, dataFinal)
    // console.log(investimento.lenght)

    if(investimento  == NaN)
        {
            alert("Preencha todos os dados !")
        }
    
    if(investimento < 0 || taxaSelic < 0 || taxaDi < 0 || dataCompra == "" || dataFinal == ""){
        alert("Preencha os valores corretamente !")
    }

    else{
        if(cdb_on == 0 && lca_on == 0){
            alert("Clique em CDB ou LCA/LCI");
        }

        if(cdb_on == 1){
            var dias_corridos = defIr()[0];
            var ir = defIr()[1];
            var taxa_diaria = taxaEquivalente();

            var valorBruto = investimento*((1+taxa_diaria)**dias_corridos);
            var lucroBruto = valorBruto - investimento;
            var imposto = lucroBruto * (ir/100);
            var lucroLiquido = lucroBruto - imposto;
            var valorLiquido = lucroLiquido + investimento;
        }

        if(lca_on == 1){
            var dias_corridos = defIr()[0];
            var ir = 0;
            var taxa_diaria = taxaEquivalente();
        
            var valorBruto = investimento*((1+taxa_diaria)**dias_corridos);
            var lucroBruto = valorBruto - investimento;
            var imposto = lucroBruto * (ir);
            var lucroLiquido = lucroBruto - imposto;
            var valorLiquido = lucroLiquido + investimento;
        }

        document.getElementById("investimento_resultado").innerHTML = `R$ ${investimento.toFixed(2)}`;
        // document.getElementById("lucroBruto").value = lucroBruto.toFixed(2);
        document.getElementById("lucroBruto").innerHTML = `R$ ${lucroBruto.toFixed(2)}`;
        // document.getElementById("percentualIr").value = ir;
        document.getElementById("percentualIr").innerHTML = `% ${ir}`;
        // document.getElementById("impostoRenda").value = imposto.toFixed(2);
        document.getElementById("impostoRenda").innerHTML = `R$ ${imposto.toFixed(2)}`;
        // document.getElementById("lucroLiquido").value = lucroLiquido.toFixed(2);
        document.getElementById("lucroLiquido").innerHTML = `R$ ${lucroLiquido.toFixed(2)}`;
        // document.getElementById("valorLiquido").value = valorLiquido.toFixed(2);
        document.getElementById("valorLiquido").innerHTML = `R$ ${valorLiquido.toFixed(2)}`;
    }
}