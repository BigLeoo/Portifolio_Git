function selecionarBotao(buttom){
    var buttoms = document.querySelectorAll(".selectButtoms");

    buttoms.forEach(function(b) {
        b.classList.remove("selecionado");
    });

    buttom.classList.add("selecionado");
}

function taxaEquivalente(taxaSelic, taxaDi){
    let cdi = taxaSelic - 0.1;
    let taxaAno = (cdi/100)*(taxaDi/100);
    let taxaDiaria = (1+taxaAno)**(1/360)-1;
    return taxaDiaria
}

function calculoIr(dataCompra, dataFinal){
    let data1 = new Date(dataCompra);
    let data2 = new Date(dataFinal);
    let diferencaData = (data1 - data2)/86400000;

    if(diferencaData <= 180){
        var ir = 22.5;
    }

    if(diferencaData > 180 &)
    console.log('dias de diferença: ',diferencaData);
    console.log('IR: ', ir)
    return diferencaData
}

let data = new Date();
console.log(data.getDate());


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



