function selecionarBotao(buttom){
    var buttoms = document.querySelectorAll(".selectButtoms");

    buttoms.forEach(function(b) {
        b.classList.remove("selecionado");
    });

    buttom.classList.add("selecionado");
}

//------------------------ Calculo do Resultado -----------------------------------------------

function taxaEquivalente(){
    let taxaSelic = document.querySelector('#taxaSelic').value;
    let taxaDi = document.querySelector('#taxaDi').value;
    
    let cdi = taxaSelic - 0.1;
    let taxaAno = (cdi/100)*(taxaDi/100);
    let taxaDiaria = (1+taxaAno)**(1/360)-1;

    return taxaDiaria // formato = 0.x
}

function defIr(){
    let dataCompra = document.querySelector('#dataCompra').value;
    let dataFinal = document.querySelector('#dataFinal').value;

    // console.log('Data compra: ',dataCompra);

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
    let dias_corridos = defIr()[0];
    let ir = defIr()[1];
    let taxa_diaria = taxaEquivalente();
    let investimento = document.querySelector('#investimento').value;

    let valorBruto = investimento*((1+taxa_diaria)**dias_corridos);
    let lucroBruto = valorBruto - investimento;
    let imposto = lucroBruto * (ir/100);
    let lucroLiquido = lucroBruto - imposto;
    let valorLiquido = lucroLiquido + investimento;
    
    console.log(valorLiquido)

    document.getElementById("lucroBruto").value = lucroBruto.toFixed(2);
    document.getElementById("percentualIr").value = ir;
    document.getElementById("impostoRenda").value = imposto.toFixed(2);
    document.getElementById("lucroLiquido").value = lucroLiquido.toFixed(2);
    document.getElementById("valorLiquido").value = parseFloat(valorLiquido).toFixed(2);

}
