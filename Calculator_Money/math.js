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

//------------------------ Calculo do Resultado -----------------------------------------------

function taxaEquivalente(){
    let taxaSelic = parseFloat(document.querySelector('#taxaSelic').value);
    let taxaDi = parseFloat(document.querySelector('#taxaDi').value);
    
    let cdi = taxaSelic - 0.1;
    let taxaAno = (cdi/100)*(taxaDi/100);
    let taxaDiaria = (1+taxaAno)**(1/360)-1;

    return taxaDiaria // formato = 0.x
}

function defIr(){
    let dataCompra = document.querySelector('#dataCompra').value;
    let dataFinal = document.querySelector('#dataFinal').value;

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

    if(cdb_on == 0 && lca_on == 0){
        alert("Clique em CDB ou LCA/LCI");
    }

    if(cdb_on == 1){
        var dias_corridos = defIr()[0];
        var ir = defIr()[1];
        var taxa_diaria = taxaEquivalente();
        var investimento = parseFloat(document.querySelector('#investimento').value);

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
        var investimento = parseFloat(document.querySelector('#investimento').value);
    
        var valorBruto = investimento*((1+taxa_diaria)**dias_corridos);
        var lucroBruto = valorBruto - investimento;
        var imposto = lucroBruto * (ir);
        var lucroLiquido = lucroBruto - imposto;
        var valorLiquido = lucroLiquido + investimento;
    }

    document.getElementById("lucroBruto").value = lucroBruto.toFixed(2);
    document.getElementById("percentualIr").value = ir;
    document.getElementById("impostoRenda").value = imposto.toFixed(2);
    document.getElementById("lucroLiquido").value = lucroLiquido.toFixed(2);
    document.getElementById("valorLiquido").value = valorLiquido.toFixed(2);
}
