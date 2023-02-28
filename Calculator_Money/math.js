function selecionarBotao(buttom){
    var buttoms = document.querySelectorAll(".selectButtoms");

    buttoms.forEach(function(b) {
        b.classList.remove("selecionado");
    });

    buttom.classList.add("selecionado");
}

function taxaEquivalente(taxaSelic, taxaDi){
    var cdi = taxaSelic - 0.1;
    var taxaAno = (cdi/100)*(taxaDi/100);
    var taxaDiaria = (1+taxaAno)**(1/360)-1;
    return taxaDiaria
}

function calculoIr(dataCompra, dataFinal){
    var diasData = dataFinal - dataCompra;
    return diasData
}

// const btn = document.getElementById("#btn_calcular")

// btn.addEventListener("click", function() {
//     var investimento = document.getElementById("#investimento");
//     var taxaSelic = document.getElementById("#taxaSelic");
//     var taxaDi = document.getElementById("#taxaDi");
//     var dataCompra = document.getElementById("#dataCompra");
//     var dataFinal = document.getElementById("#dataFinal");
//     var btnVariavel = document.getElementsByClassName(".selecionado")

//     if(btnVariavel == cdb){
//         var diferencaDatas = dataCompra - dataFinal;


//     }
// })



