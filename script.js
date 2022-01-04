function zpracuj() {
    let vstupZeStranky = document.getElementById("vstup").value;
    console.log(vstupZeStranky);
  
    document.getElementById("vystup").innerHTML = "Zadal jsi <b>" + vstupZeStranky + "</b>";
  }