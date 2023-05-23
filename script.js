const  baseURL="https://62b6c44e491a19c97ae8e988.mockapi.io/";
let originalData=[];
const getAllContent = () => {
    fetch(`${baseURL}/user`)
    .then((data) => data.json())
    .then((data) => {
        originalData=[...data];
        document.getElementById('tbody').innerHTML=populateTabledata(data);
    })
    .catch((er) => errorHandler(er))
};
const errorHandler = (er) => console.error(er);
const populateTabledata = (data) =>{
    let tableContent="";
    for(let index = 0; index < data.length; index++){
        tableContent +=`<tr>
        <th scope="row">${data[index].id}</th>
        <td>${data[index].name}</td>
        <td><img src="${data[index].avatar}"style="width:3rem"/></td>
        <td>${data[index].createdAt}</td>
        <td><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewModal" onclick="viewHandler(${data[index].id})">view</button></td>
        <td><button class="btn btn-danger" onclick='deleteHandler(${data[index].id},"${data[index].name}")'>delete</button></td>
      </tr>`;
    }
    return tableContent;
}
const deleteHandler=(id, name)=>{
    if(confirm(`Are you sure to delete ${name} record ?`))
    {
        fetch(`${baseURL}/user/${id}`,{method:"delete"}).then(data=>data.json()).then((data)=>{
        console.log(data);
        getAllContent();
        })
        .catch((er)=>errorHandler(er));
    }
};
const viewHandler= (id) => {
    if(originalData.length >  0){
        let filteredData = originalData.filter(x=>x.id === id.toString());
        if(filteredData.length > 0)
        {
            document.getElementById("studentID").innerHTML = `<strong>StudentID : ${filteredData[0].id}</strong>`;
            document.getElementById("studentName").innerHTML = `StudentName :${filteredData[0].name}`;
            document.getElementById("CreatedAt").innerHTML = `CreatedAt : ${filteredData[0].createdAt}`;
            document.getElementById("studentImg").setAttribute('src', filteredData[0].avatar);
        }
        else {
            console.log("No data found for the given ID");
    }
    }
};
getAllContent();