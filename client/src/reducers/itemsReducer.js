const initialData = {
    items: [
        {
            itemName: "Pollo con apio",
            itemCode: "pollo_apio",
            itemColor: "yellowgreen"
        },
        {
            itemName:"Pollo clásico",
            itemCode: "pollo_clasico",
            itemColor: "white"
        },
        {
            itemName:"Pollo con durazno",
            itemCode: "pollo_durazno",
            itemColor: "yellow"
        },
        {
            itemName:"Pollo con tocino",
            itemCode: "pollo_tocino",
            itemColor: "orange"
        },
        {
            itemName:"Pollo con cabanossi",
            itemCode: "pollo_cabanossi",
            itemColor: "red"
        },
        {
            itemName:"Cheese Burger",
            itemCode: "cheese_burger",
            itemColor: "brown"
        },
    ]
}

function itemsReducer(state = initialData, action){
    switch(action.type){

    }
    return state
}

export default itemsReducer