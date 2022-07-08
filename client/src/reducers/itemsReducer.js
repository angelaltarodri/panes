const initialData = {
    petipanesSabores: [
        {
            itemType: ["petipanes", "adicional"],
            itemLongName: "Caja de Petipanes 30x30",
            itemShortName: "Caja de petipanes",
            itemCode: "caja_petipanes",
            itemBackgroundColor: "white",
            itemTextColor: "black",
            itemPriceNormal: true,
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName: "Pan con Pollo y Apio",
            itemShortName: "Pollo y apio",
            itemCode: "pollo_apio",
            itemBackgroundColor: "yellowgreen",
            itemTextColor: "black",
            itemPriceNormal: true,
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Pollo Clásico",
            itemShortName:"Pollo clásico",
            itemCode: "pollo_clasico",
            itemBackgroundColor: "white",
            itemTextColor: "black",
            itemPriceNormal: true,
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Pollo y Durazno",
            itemShortName:"Pollo y durazno",
            itemCode: "pollo_durazno",
            itemBackgroundColor: "yellow",
            itemTextColor: "black",
            itemPriceNormal: true,
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Pollo y Tocino",
            itemShortName:"Pollo y tocino",
            itemCode: "pollo_tocino",
            itemBackgroundColor: "orange",
            itemTextColor: "black",
            itemPriceNormal: true,
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Pollo y Cabanossi",
            itemShortName:"Pollo y cabanossi",
            itemCode: "pollo_cabanossi",
            itemBackgroundColor: "red",
            itemTextColor: "white",
            itemPriceNormal: true,
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Hamburguesa con Queso Clásica",
            itemShortName:"Cheese Burger",
            itemCode: "cheese_burger",
            itemBackgroundColor: "brown",
            itemTextColor: "white",
            itemPriceNormal: false,
            itemPriceChange: 2
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Huevo y Cabanossi",
            itemShortName:"Huevo c. cabanossi",
            itemCode: "huevo_cabanossi",
            itemBackgroundColor: "wheat",
            itemTextColor: "black",
            itemPriceNormal: true,
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Salchicha Huachana y Huevo",
            itemShortName:"Salchicha Huachana",
            itemCode: "salchicha_huachana",
            itemBackgroundColor: "gold",
            itemTextColor: "black",
            itemPriceNormal: true,
            itemPriceChange: 0
        },
    ]
}

function itemsReducer(state = initialData, action){
    switch(action.type){

    }
    return state
}

export default itemsReducer