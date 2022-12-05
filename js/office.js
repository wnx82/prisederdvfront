const office = {
    data : []

};

office.init = function () {
    //get DOM elements
    office.tableContent = document.querySelector('#container-list table tbody')
    console.log(office.tableContent,'office.tableContent')

    office.data = office.getAll();
    console.log('Initialisation du controller office');
}

office.getAll = () => {
    //MOCK

    return [
        {
            id: 1,
            name: "Bureau 1"
        },
        {
            id: 2,
            name: "Bureau 2"
        }
    ]
};

app.controllers.office = office;

