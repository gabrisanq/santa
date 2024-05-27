function readFile() {

    var dati = '';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState ==  4 && this.status == 200){
            var data = xmlhttp.responseText;

            var rows = data.split(/\n/);
            for (var i=0 ; i<rows.length; i++){
                var rowCells = rows[i].split(',');
                for (var j= 0; j<rowCells.length; j++){
                       dati += rowCells[j] + " * ";
                    }
                    dati += "<br>";
            }
            document.getElementById("stampadati").innerHTML = dati;
        }
    }






}