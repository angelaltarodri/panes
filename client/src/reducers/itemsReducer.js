const initialData = {
    petipanesSabores: [
        {
            itemType: ["petipanes", "producto"],
            itemLongName: "Pan con Pollo y Apio",
            itemShortName: "Pollo y apio",
            itemMiniName: "Pollo c. apio.",
            itemCode: "pollo_apio",
            itemBackgroundColor: "yellowgreen",
            itemTextColor: "black",
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Pollo Clásico",
            itemShortName:"Pollo clásico",
            itemMiniName: "Pollo clásico",
            itemCode: "pollo_clasico",
            itemBackgroundColor: "white",
            itemTextColor: "black",
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Pollo y Durazno",
            itemShortName:"Pollo y durazno",
            itemMiniName: "Pollo c. dur.",
            itemCode: "pollo_durazno",
            itemBackgroundColor: "yellow",
            itemTextColor: "black",
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Pollo y Tocino",
            itemShortName:"Pollo y tocino",
            itemMiniName: "Pollo c. toc.",
            itemCode: "pollo_tocino",
            itemBackgroundColor: "orange",
            itemTextColor: "black",
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Pollo y Cabanossi",
            itemShortName:"Pollo y cabanossi",
            itemMiniName: "Pollo c. caba.",
            itemCode: "pollo_cabanossi",
            itemBackgroundColor: "red",
            itemTextColor: "white",
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Hamburguesa con Queso Clásica",
            itemShortName:"Cheese Burger",
            itemMiniName: "Cheese Burger",
            itemCode: "cheese_burger",
            itemBackgroundColor: "brown",
            itemTextColor: "white",
            itemPriceChange: 2
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Huevo y Cabanossi",
            itemShortName:"Huevo c. cabanossi",
            itemMiniName: "Huevo c. caba.",
            itemCode: "huevo_cabanossi",
            itemBackgroundColor: "wheat",
            itemTextColor: "black",
            itemPriceChange: 0
        },
        {
            itemType: ["petipanes", "producto"],
            itemLongName:"Pan con Salchicha Huachana y Huevo",
            itemShortName:"Salchicha Huachana",
            itemMiniName: "Salchicha Hua.",
            itemCode: "salchicha_huachana",
            itemBackgroundColor: "gold",
            itemTextColor: "black",
            itemPriceChange: 0
        },
    ],
    petipanesPaquetes: [
        {
            paqueteNumero: 25,
            paquetePrecio: 55
        },
        {
            paqueteNumero: 50,
            paquetePrecio: 90
        },
        {
            paqueteNumero: 75,
            paquetePrecio: 130
        },
        {
            paqueteNumero: 100,
            paquetePrecio: 165
        }
    ]
}

function itemsReducer(state = initialData, action){
    switch(action.type){

    }
    return state
}

export default itemsReducer